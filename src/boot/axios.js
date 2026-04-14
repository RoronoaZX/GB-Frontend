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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
