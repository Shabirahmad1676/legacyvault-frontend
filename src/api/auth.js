import { apiRequest } from "./client";

export const login = (body) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const signup = (body) =>
  apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const logout = () =>
  apiRequest("/auth/logout", {
    method: "POST",
  });

export const updateQuorum = (quorum_threshold) =>
  apiRequest("/auth/quorum-threshold", {
    method: "PUT",
    body: JSON.stringify({ quorum_threshold }),
  });

export const forgotPassword = (email) =>
  apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

export const resetPassword = (token, password) =>
  apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token,
      password,
    }),
  });