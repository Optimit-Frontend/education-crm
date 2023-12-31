import axios from "axios";
import httpStatusCodes from "http-status-codes";

const tokenLocal = localStorage.getItem("EducationCRM");
export const BASE_URL = import.meta.env.VITE_API_KEY;

const instance = axios.create({
  baseURL: `${BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
    timeout: 300000,
  },
});

instance.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  if (tokenLocal && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("EducationCRM")
    || sessionStorage.getItem("EducationCRM")}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config ?? {};
    if (
      (error.response?.status === httpStatusCodes.FORBIDDEN
        || error.response?.status === httpStatusCodes.UNAUTHORIZED)
      && !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;

      if (error?.response?.status === 401) {
        if (localStorage.getItem("EducationCRM")) {
          localStorage.removeItem("EducationCRM");
        }
        window.location.href = "/login";
      }
      return instance.request(originalRequest);
    }
    return Promise.reject(error);
  },
);
export default instance;

export const api = ({ dispatch }) => {
  return (next) => {
    return (action) => {
      if (action.type !== "api/apiCall") {
        next(action);
        return;
      }
      next(action);
      const {
        url, method, data, onSuccess, params, onFail, contentType
      } = action.payload;
      instance({
        headers: {
          "Content-Type": contentType || "application/json",
          Authorization: `Bearer ${localStorage.getItem("EducationCRM") || sessionStorage.getItem("EducationCRM")}`
        },
        url,
        method,
        data,
        params,
      })
        .then((res) => {
          dispatch({
            type: onSuccess,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: onFail,
            payload: { ...err?.response?.data, success: false },
          });
        });
    };
  };
};
