import { apiRequest } from "./client";
export const createAccessRequest = (body) =>
  apiRequest("/access-requests", {
    method: "POST",
    body: JSON.stringify(body),
  });
export const getIncomingRequests = () =>
  apiRequest("/access-requests/incoming");
export const getRequestsToVote = () => apiRequest("/access-requests/to-vote");
