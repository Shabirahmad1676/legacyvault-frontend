import { apiRequest } from "./client";
export const getActivityLogs = () => apiRequest("/activity-logs");