import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as auth from "@/api/auth";
import * as vault from "@/api/vault";
import * as contacts from "@/api/trustedContacts";
import * as requests from "@/api/accessRequests";
import * as votes from "@/api/votes";
import * as activity from "@/api/activityLogs";

const data = (p) => p?.data ?? [];

export function useVaultItems() {
  return useQuery({ queryKey: ["vault-items"], queryFn: async () => data(await vault.getVaultItems()) });
}
export function useCreateVaultItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: vault.createVaultItem, onSuccess: () => qc.invalidateQueries({ queryKey: ["vault-items"] }) });
}
export function useUpdateVaultItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, body }) => vault.updateVaultItem(id, body), onSuccess: () => qc.invalidateQueries({ queryKey: ["vault-items"] }) });
}
export function useDeleteVaultItem() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: vault.deleteVaultItem, onSuccess: () => qc.invalidateQueries({ queryKey: ["vault-items"] }) });
}
export function useTrustedContacts() {
  return useQuery({ queryKey: ["trusted-contacts"], queryFn: async () => data(await contacts.getTrustedContacts()) });
}
export function useAddTrustedContact() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: contacts.addTrustedContact, onSuccess: () => {
    qc.invalidateQueries({ queryKey: ["trusted-contacts"] });
  }});
}
export function useRemoveTrustedContact() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: contacts.removeTrustedContact, onSuccess: () => {
    qc.invalidateQueries({ queryKey: ["trusted-contacts"] });
    qc.invalidateQueries({ queryKey: ["incoming-access-requests"] });
    qc.invalidateQueries({ queryKey: ["access-requests-to-vote"] });
  }});
}
export function useIncomingAccessRequests() {
  return useQuery({ queryKey: ["incoming-access-requests"], queryFn: async () => data(await requests.getIncomingRequests()) });
}
export function useAccessRequestsToVote() {
  return useQuery({ queryKey: ["access-requests-to-vote"], queryFn: async () => data(await requests.getRequestsToVote()) });
}
export function useCreateAccessRequest() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: requests.createAccessRequest, onSuccess: () => {
    qc.invalidateQueries({ queryKey: ["access-requests-to-vote"] });
  }});
}
export function useVoteOnAccessRequest() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ requestId, decision }) => votes.castVote(requestId, decision), onSuccess: () => {
    qc.invalidateQueries({ queryKey: ["access-requests-to-vote"] });
    qc.invalidateQueries({ queryKey: ["incoming-access-requests"] });
    qc.invalidateQueries({ queryKey: ["activity-logs"] });
  }});
}
export function useActivityLogs() {
  return useQuery({ queryKey: ["activity-logs"], queryFn: async () => data(await activity.getActivityLogs()) });
}
export function useUpdateQuorum() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: auth.updateQuorum, onSuccess: () => qc.invalidateQueries({ queryKey: ["session"] }) });
}
export function useAssignedVaults() {
  return useQuery({
    queryKey: ["assignedVaults"],
    queryFn: async () => data(await contacts.getAssignedVaults())
  });
} 

export function useSharedVaultItems(owner_id) {
  return useQuery({
    queryKey: ["sharedVaultItems", owner_id],
    queryFn: () => vault.getSharedItems(owner_id),
    select: data,
    enabled: !!owner_id, 
  });
}