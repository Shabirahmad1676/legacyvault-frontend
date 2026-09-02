import { apiRequest } from "./client";
export const login = (body) =>
  apiRequest("/auth/login", { method: "POST", body: JSON.stringify(body) });
export const signup = (body) =>
  apiRequest("/auth/signup", { method: "POST", body: JSON.stringify(body) });
export const logout = () => apiRequest("/auth/logout", { method: "POST" });
export const updateQuorum = (quorum_threshold) =>
  apiRequest("/auth/quorum-threshold", {
    method: "PUT",
    body: JSON.stringify({ quorum_threshold }),
  });
