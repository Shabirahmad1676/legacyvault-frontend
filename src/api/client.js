import axios from "axios";
import { getToken, clearSession } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      clearSession();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    const customError = new Error(error.response?.data?.message || "Something went wrong.");
    customError.status = error.response?.status;
    customError.payload = error.response?.data;
    throw customError;
  }
);

export async function apiRequest(path, options = {}) {
  const { method = "GET", body, headers = {} } = options;
  try {
    const response = await apiClient({
      url: path,
      method,
      data: body,
      headers,
    });
    return response;
  } catch (error) {
    throw error;
  }
}