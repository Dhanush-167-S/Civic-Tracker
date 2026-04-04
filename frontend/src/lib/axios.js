import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearUser();
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
