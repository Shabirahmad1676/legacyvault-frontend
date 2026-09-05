"use client";

import Link from "next/link";
import {
  ChevronRight,
  Clock3,
} from "lucide-react";

import {
  VaultCategoryIcon,
} from "./VaultCategoryIcon";

import {
  VaultVisibilityBadge,
} from "./VaultVisibilityBadge";

export function VaultItemRow({
  item,
}) {
  const updatedAt = item.updated_at || item.created_at;

  return (
    <Link
      href={`/vault/${item.vault_item_id}`}
      className="
        group flex items-center gap-3
        rounded-xl border border-[#E1E8E3]
        bg-white px-3 py-2.5
        transition-all
        hover:border-[#BFD4C9]
        hover:shadow-[0_4px_16px_rgba(6,59,45,0.05)]
      "
    >
      {/* Item */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <VaultCategoryIcon category={item.category} />

        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold text-[#0B1F18]">
            {item.title}
          </p>

          <p className="mt-0.5 text-[8px] text-[#829089] sm:hidden">
            {item.category}
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="hidden w-28 shrink-0 sm:block">
        <span className="text-[8px] font-medium capitalize text-[#64706A]">
          {item.category}
        </span>
      </div>

      {/* Updated */}
      <div className="hidden w-28 shrink-0 md:block">
        <div className="flex items-center gap-1 text-[8px] text-[#829089]">
          <Clock3 className="h-2.5 w-2.5" />

          <span>
            {formatDate(updatedAt)}
          </span>
        </div>
      </div>

      {/* Visibility */}
      <div className="hidden w-32 shrink-0 sm:block">
        <VaultVisibilityBadge
          alwaysVisible={item.is_always_visible}
        />
      </div>

      <ChevronRight
        className="
          h-3.5 w-3.5 shrink-0
          text-[#A2ADA7]
          transition-transform
          group-hover:translate-x-0.5
          group-hover:text-[#087653]
        "
      />
    </Link>
  );
}

function formatDate(date) {
  if (!date) return "—";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "—";
  }

  const now = new Date();

  const sameDay =
    value.toDateString() === now.toDateString();

  if (sameDay) {
    return "Today";
  }

  return value.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}