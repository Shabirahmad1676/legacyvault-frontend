"use client";

import { ShieldCheck, Users } from "lucide-react";

export function VaultVisibilityBadge({
  alwaysVisible,
}) {
  if (alwaysVisible) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[#BFE8D3] bg-[#E8F8EF] px-2 py-1 text-[8px] font-semibold text-[#087653]">
        <ShieldCheck className="h-2.5 w-2.5" />
        Always visible
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#D5E4DC] bg-[#F3F7F4] px-2 py-1 text-[8px] font-semibold text-[#41685A]">
      <Users className="h-2.5 w-2.5" />
      Quorum required
    </span>
  );
}