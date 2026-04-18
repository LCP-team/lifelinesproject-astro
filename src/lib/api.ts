import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "https://api.sophiaathena.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUrl = `${API_BASE_URL}/auth/google`;

export default api;
