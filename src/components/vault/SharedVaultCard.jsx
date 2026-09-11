"use client";

import Link from "next/link";
import { Lock, FileText, ChevronRight } from "lucide-react";
import { useSharedVaultItems } from "@/hooks/useLegacyVault";

export function SharedVaultCard({ link }) {
  const ownerId = link.owner_id;
  const ownerEmail = link.vault_owner?.email || "user@domain.com";
  const ownerName = link.vault_owner?.username || link.vault_owner?.name || ownerEmail.split("@")[0];
  const relationship = link.relationship_label || "Trusted Contact";

  const { data: items = [], isLoading } = useSharedVaultItems(ownerId);

  const visibleItems = items.filter((item) => !item.is_locked || item.is_always_visible);
  const lockedItems = items.filter((item) => item.is_locked && !item.is_always_visible);
  const hasAccess = visibleItems.length > 0;
  const initials = ownerName.slice(0, 2).toUpperCase();

  return (
    <Link
      href={`/shared-vaults/${ownerId}`}
      className="group flex h-full flex-col justify-between rounded-[26px] border border-slate-200/90 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:border-[#063B2D]/40 hover:shadow-md"
    >
      <div>
        {/* Header: Owner identity & status badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-slate-900 capitalize group-hover:text-[#063B2D] transition-colors">
                {ownerName}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                {relationship} &bull; Registered Owner
              </p>
            </div>
          </div>

          {hasAccess ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF8F2] px-3.5 py-1 text-xs font-medium text-[#10754B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10754B]" />
              Access Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCF4E9] px-3.5 py-1 text-xs font-medium text-[#9E6219]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9822B]" />
              No Active Access
            </span>
          )}
        </div>

        <div className="my-6 border-t border-slate-100" />

        {/* Card Body */}
        {isLoading ? (
          <div className="py-8 text-center text-xs text-slate-400">
            Checking permissions...
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#F9FBFA] px-4 py-3 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#063B2D]" /> Always Visible Items
              </span>
              <span className="font-bold text-slate-900">{visibleItems.length}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#F9FBFA] px-4 py-3 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-2">
                <Lock className="h-4 w-4 text-amber-600" /> Quorum Protected Items
              </span>
              <span className="font-bold text-slate-900">{lockedItems.length}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between pt-2 text-xs font-semibold text-[#063B2D]">
        <span>Open {ownerName}&apos;s Vault</span>
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}