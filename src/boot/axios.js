import { boot } from "quasar/wrappers";
import axios from "axios";
import { Platform } from "quasar";
const API_HOSTS = {
  production: "https://gbebakeshop.com",
  capacitor: "http://10.0.2.2:8000",
  development: "http://localhost:8000",
};

const baseURL =
  process.env.NODE_ENV === "production"
    ? API_HOSTS.production
    : Platform.is.capacitor
    ? API_HOSTS.capacitor
    : API_HOSTS.development;

const api = axios.create({ baseURL });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

const REFRESH_THRESHOLD = 7 * 60 * 60 * 1000; // 7 Hours
let isRefreshing = false;

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const tokenCreatedAt = localStorage.getItem("token_created_at");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      // Pre-emptively refresh token if it is older than 7 hours
      if (tokenCreatedAt && !isRefreshing) {
        const age = Date.now() - parseInt(tokenCreatedAt);
        if (age > REFRESH_THRESHOLD) {
          isRefreshing = true;
          try {
            const res = await api.post("/api/refresh-token");
            const newToken = res.data.token;
            localStorage.setItem("token", newToken);
            localStorage.setItem("token_created_at", Date.now().toString());
            config.headers.Authorization = `Bearer ${newToken}`;
          } catch (err) {
            console.error("Failed to pre-emptively refresh token:", err);
          } finally {
            isRefreshing = false;
          }
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear localStorage values
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("uuid");
      localStorage.removeItem("reference_id");
      localStorage.removeItem("branch_id");
      localStorage.removeItem("warehouse_id");
      localStorage.removeItem("activeMenuItem");

      // Hard-redirect to clear in-memory stores (Pinia)
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { api };
