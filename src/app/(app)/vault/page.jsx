"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Vault,
  LockKeyhole,
} from "lucide-react";

import {
  useVaultItems,
} from "@/hooks/useLegacyVault";

import {
  Loading,
  ErrorState,
  EmptyState,
} from "@/components/ui";

import {
  VaultItemRow,
} from "@/components/vault/VaultItemRow";

import {
  VaultListMotion,
  VaultItemMotion,
  VaultPageMotion,
} from "@/components/vault/VaultPageMotion";

const filters = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "password",
    label: "Passwords",
  },
  {
    value: "document",
    label: "Documents",
  },
  {
    value: "instruction",
    label: "Instructions",
  },
  {
    value: "asset",
    label: "Assets",
  },
];

export default function VaultPage() {
  const query = useVaultItems();

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [search, setSearch] = useState("");

  if (query.isLoading) {
    return (
      <Loading text="Loading your vault..." />
    );
  }

  if (query.isError) {
    return (
      <ErrorState
        error={query.error}
        retry={query.refetch}
      />
    );
  }

  const items = query.data || [];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeFilter === "all" ||
        item.category === activeFilter;

      const searchValue =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        item.title
          ?.toLowerCase()
          .includes(searchValue);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [items, activeFilter, search]);

  return (
    <VaultPageMotion>
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#087653]">
              Private information
            </p>

            <span className="h-1 w-1 rounded-full bg-[#B8F36B]" />
          </div>

          <h1 className="text-[25px] font-bold tracking-tight text-[#0B1F18]">
            My Vault
          </h1>

          <p className="mt-1 text-[10px] text-[#718078]">
            Keep your collection of important information secure.
          </p>
        </div>

        <Link
          href="/vault/new"
          className="
            inline-flex items-center justify-center gap-1.5
            rounded-full bg-[#063B2D]
            px-4 py-2
            text-[9px] font-semibold text-white
            transition-all
            hover:bg-[#07503D]
            hover:shadow-[0_5px_18px_rgba(6,59,45,0.16)]
          "
        >
          <Plus className="h-3 w-3" />
          Create vault item
        </Link>
      </div>

      {/* Toolbar */}
      <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const active =
              activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setActiveFilter(filter.value)
                }
                className={[
                  "shrink-0 rounded-full px-3 py-1.5",
                  "text-[8px] font-semibold",
                  "border transition-colors",
                  active
                    ? "border-[#063B2D] bg-[#063B2D] text-white"
                    : "border-[#DDE6E1] bg-white text-[#64706A] hover:border-[#BFD4C9] hover:text-[#063B2D]",
                ].join(" ")}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-48">
          <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#9AA7A0]" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search vault..."
            className="
              h-8 w-full rounded-lg
              border border-[#DDE6E1]
              bg-white
              pl-8 pr-3
              text-[9px] text-[#0B1F18]
              outline-none
              placeholder:text-[#A1ADA7]
              focus:border-[#10B981]
              focus:ring-2 focus:ring-[#10B981]/10
            "
          />
        </div>
      </div>

      {/* Vault */}
      {items.length === 0 ? (
        <EmptyState
          title="Your vault is empty"
          description="Start by adding your first important piece of information."
          action={
            <Link
              href="/vault/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#063B2D] px-4 py-2 text-[9px] font-semibold text-white"
            >
              <Plus className="h-3 w-3" />
              Create vault item
            </Link>
          }
        />
      ) : filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-[#E1E8E3] bg-white px-6 py-12 text-center">
          <Search className="mx-auto h-5 w-5 text-[#8B9992]" />

          <p className="mt-2 text-[10px] font-semibold text-[#0B1F18]">
            No matching items
          </p>

          <p className="mt-1 text-[9px] text-[#718078]">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden">
          {/* Column headings */}
          <div className="mb-1 hidden items-center gap-3 px-3 sm:flex">
            <div className="flex-1 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#8A9790]">
              Vault item
            </div>

            <div className="w-28 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#8A9790]">
              Category
            </div>

            <div className="w-28 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#8A9790]">
              Last updated
            </div>

            <div className="w-32 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#8A9790]">
              Access visibility
            </div>

            <div className="w-3.5" />
          </div>

          <VaultListMotion>
            <div className="space-y-1.5">
              {filteredItems.map((item) => (
                <VaultItemMotion
                  key={item.vault_item_id}
                >
                  <VaultItemRow item={item} />
                </VaultItemMotion>
              ))}
            </div>
          </VaultListMotion>
        </div>
      )}

      {/* Small security footer */}
      {items.length > 0 && (
        <div className="mt-4 flex items-center gap-2 text-[8px] text-[#829089]">
          <LockKeyhole className="h-3 w-3 text-[#087653]" />

          <span>
            Your vault is protected by your configured access rules.
          </span>
        </div>
      )}
    </VaultPageMotion>
  );
}