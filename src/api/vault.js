import { apiRequest } from "./client";

export const getVaultItems = () => apiRequest("/vault-items");

export const getVaultItemById = (id) => apiRequest(`/vault-items/${id}`);

export const getSharedItems = (ownerId) =>    
  apiRequest(`/vault-items/shared/${ownerId}`);

export const createVaultItem = (body) =>   
  apiRequest("/vault-items", { method: "POST", body: JSON.stringify(body) });

export const updateVaultItem = (id, body) =>   
  apiRequest(`/vault-items/${id}`, {     
    method: "PUT",     
    body: JSON.stringify(body),   
  });

export const deleteVaultItem = (id) =>   
  apiRequest(`/vault-items/${id}`, { method: "DELETE" });