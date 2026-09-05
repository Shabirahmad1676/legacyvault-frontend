import { apiRequest } from "./client";

export const getTrustedContacts = () => apiRequest("/trusted-contacts");

export const addTrustedContact = (body) => 
  apiRequest("/trusted-contacts", { method: "POST", body: JSON.stringify(body) });

export const removeTrustedContact = (id) => 
  apiRequest(`/trusted-contacts/${id}`, { method: "DELETE" });

// Add this new endpoint
export const getAssignedVaults = () => 
  apiRequest("/trusted-contacts/assigned-vaults");