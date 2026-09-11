"use client";

import { use, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Lock, 
  Eye, 
  KeyRound, 
  FileText, 
  BookOpen, 
  WalletCards,
  ShieldAlert
} from "lucide-react";
import { 
  useSharedVaultItems, 
  useAssignedVaults, 
  useIncomingAccessRequests, 
  useAccessRequestsToVote 
} from "@/hooks/useLegacyVault";
import { Loading, ErrorState, Modal } from "@/components/ui";

const categoryIcons = {
  password: KeyRound,
  document: FileText,
  instruction: BookOpen,
  asset: WalletCards,
};

const categoryDisplayNames = {
  password: "Password",
  document: "Legal Document",
  instruction: "Instructions",
  asset: "Digital Asset",
};

export default function OwnerSharedVaultPage({ params }) {
  // Safe resolution for both Next.js 14 and 15 parameter handling
  const clientParams = useParams();
  const resolvedParams = params && typeof params.then === "function" ? use(params) : params;
  const ownerId = resolvedParams?.ownerId || clientParams?.ownerId;

  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);

  const { data: assigned = [], isLoading: isAssignedLoading } = useAssignedVaults();
  const { data: items = [], isLoading: isItemsLoading, isError, error, refetch } = useSharedVaultItems(ownerId);
  
  const incomingReqs = useIncomingAccessRequests();
  const votingReqs = useAccessRequestsToVote();
  const allReqs = [...(incomingReqs.data || []), ...(votingReqs.data || [])];
  
  const activeRequest = allReqs.find(
    (r) => r.TrustedContact?.owner_id === ownerId && r.status === "pending"
  );

  const currentVault = assigned.find((v) => v.owner_id === ownerId);
  const ownerName =
    currentVault?.vault_owner?.username ||
    currentVault?.vault_owner?.name ||
    currentVault?.vault_owner?.email?.split("@")[0] ||
    "Owner";

  if (isAssignedLoading || isItemsLoading) {
    return <Loading text="Decrypting authorized vault items..." />;
  }

  if (isError) {
    return <ErrorState error={error} retry={refetch} />;
  }

  const visibleItems = items.filter((item) => !item.is_locked || item.is_always_visible);
  const lockedItems = items.filter((item) => item.is_locked && !item.is_always_visible);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/shared-vaults")}
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shared Vaults
      </button>

      {/* Header with Emergency Action Button */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 capitalize">
            {ownerName}&apos;s Vault
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Relationship: {currentVault?.relationship_label || "Trusted Contact"} &bull; Protected by LegacyVault
          </p>
        </div>

        {lockedItems.length > 0 && (
          <div>
            {activeRequest ? (
              <Link
                href={`/access-requests/${activeRequest.request_id}`}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-100"
              >
                View Active Request ({activeRequest.status}) &rarr;
              </Link>
            ) : (
              <Link
                href={`/access-requests/new?owner_id=${ownerId}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#063B2D] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#07503D]"
              >
                <ShieldAlert className="h-4 w-4" />
                Request Emergency Access
              </Link>
            )}
          </div>
        )}
      </div>

      {/* 2 Column View: Always Visible vs Quorum Protected */}
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* Visible / Decrypted Items */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              ALWAYS VISIBLE (DECRYPTED)
            </h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              {visibleItems.length} Available
            </span>
          </div>

          {visibleItems.length === 0 ? (
            <p className="py-10 text-center text-xs text-slate-400">
              No always-visible items configured by {ownerName}.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {visibleItems.map((item) => {
                const Icon = categoryIcons[item.category] || FileText;
                return (
                  <button
                    key={item.vault_item_id || item.id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-100 bg-[#F9FBFA] px-4 py-3.5 text-left transition hover:border-slate-200 hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-slate-700" />
                      <span className="text-xs font-semibold text-slate-900">
                        {item.title}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/60 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                      <Eye className="h-3 w-3" /> View Content
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quorum Protected Items */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              QUORUM PROTECTED
            </h2>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
              {lockedItems.length} Locked
            </span>
          </div>

          {lockedItems.length === 0 ? (
            <p className="py-10 text-center text-xs text-slate-400">
              No items locked behind quorum protection.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {lockedItems.map((item) => {
                const Icon = categoryIcons[item.category] || FileText;
                return (
                  <div
                    key={item.vault_item_id || item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#F9FBFA] px-4 py-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-medium text-slate-500">
                        {item.title}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">
                      <Lock className="h-3 w-3" /> Quorum Required
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Content Modal for Always Visible items */}
      <Modal
        open={!!selectedItem}
        title={selectedItem?.title || "Vault Item"}
        onClose={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Category</p>
              <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                {categoryDisplayNames[selectedItem.category] || selectedItem.category}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Content</p>
              <div className="mt-1.5 whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800">
                {selectedItem.content}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}