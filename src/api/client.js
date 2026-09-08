import { getToken, clearSession } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const headers = { 
    ...(options.body ? { "Content-Type": "application/json" } : {}), 
    ...(options.headers || {}) 
  };
  
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store"
  });

  // ✅ Fix: Initialize as an empty object structure to prevent deep downstream undefined crashes
  let payload = { data: [] }; 
  try { 
    const textData = await response.text();
    // Only attempt JSON parsing if there is an actual text payload present
    if (textData) {
      payload = JSON.parse(textData);
    }
  } catch (err) {
    console.warn("Failed to parse response payload layout:", err);
  }

  if (response.status === 401) {
    clearSession();
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
  }

  if (!response.ok) {
    const error = new Error(payload?.message || "Something went wrong.");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  
  return payload;
}
