import axios from "axios";
import { ENV } from "../utils/env";
import { getToken, clearToken, clearUser } from "../utils/storage";

const API_BASE = ENV.API_BASE || "";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

let logoutHandler = null;

export function setLogoutHandler(fn) {
  logoutHandler = fn;
}

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        clearToken();
        clearUser();
      } catch (e) {}

      if (typeof logoutHandler === "function") {
        try {
          logoutHandler();
        } catch (e) {
          console.error("logoutHandler error", e);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
