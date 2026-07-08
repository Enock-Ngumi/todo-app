import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
    baseURL: "https://localhost:7257/api"
=======
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7257/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
>>>>>>> 88b6382 (adding features)
});

export default API;