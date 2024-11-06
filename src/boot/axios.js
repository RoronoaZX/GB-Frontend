import { boot } from "quasar/wrappers";
import axios from "axios";

let url = "http://localhost:8000";
if (process.env.NODE_ENV === "production") {
  url = "http://192.168.1.18:8000";
}
const api = axios.create({ baseURL: url });

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
