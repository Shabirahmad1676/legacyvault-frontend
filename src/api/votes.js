import { apiRequest } from "./client";
export const castVote = (requestId, decision) =>
  apiRequest(`/votes/request/${requestId}`, { method: "POST", body: JSON.stringify({ decision }) });