import axios from "axios";
import httpStatusCodes from "http-status-codes";

const tokenLocal = localStorage.getItem("NEW-TOKEN");
const BASE_URL = import.meta.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    timeout: 10000,
  },
});

instance.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${tokenLocal}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config ?? {};
    if (
      (error.response?.status === httpStatusCodes.FORBIDDEN ||
        error.response?.status === httpStatusCodes.UNAUTHORIZED) &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;

      if (error?.response?.status === 401) {
        if (localStorage.getItem("NEW-TOKEN")) {
          localStorage.removeItem("NEW-TOKEN");
        }
        window.location.href = "/login";
      }
      return instance.request(originalRequest);
    }
    return Promise.reject(error);
  },
);
export default instance;
