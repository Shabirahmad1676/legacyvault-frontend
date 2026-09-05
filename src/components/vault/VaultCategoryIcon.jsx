"use client";

import {
  KeyRound,
  FileText,
  BookOpen,
  WalletCards,
} from "lucide-react";

const config = {
  password: {
    icon: KeyRound,
    label: "Password",
  },
  document: {
    icon: FileText,
    label: "Document",
  },
  instruction: {
    icon: BookOpen,
    label: "Instruction",
  },
  asset: {
    icon: WalletCards,
    label: "Asset",
  },
};

export function VaultCategoryIcon({
  category,
  showLabel = false,
}) {
  const item = config[category] || config.asset;
  const Icon = item.icon;

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF7E9] text-[#087653]">
        <Icon className="h-3.5 w-3.5" />
      </div>

      {showLabel && (
        <span className="text-[10px] font-medium text-[#0B1F18]">
          {item.label}
        </span>
      )}
    </div>
  );
}

export function getCategoryLabel(category) {
  return config[category]?.label || category;
}