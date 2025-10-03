import axios from "axios";
import { baseUrl } from "./baseUrl";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Add token dynamically before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("letsmeetToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;