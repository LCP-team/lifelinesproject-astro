import axios from "axios";

export const API_BASE_URL = "https://api.lifelinesproject.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUrl = `${API_BASE_URL}/auth/google`;

export default api;
