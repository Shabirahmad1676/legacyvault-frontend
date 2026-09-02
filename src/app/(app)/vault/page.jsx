"use client";
import Link from "next/link";
import { useState } from "react";
import {
  useVaultItems,
  useDeleteVaultItem,
} from "../../../hooks/useLegacyVault";
import {
  PageHeader,
  Button,
  Loading,
  ErrorState,
  EmptyState,
  Badge,
  Modal,
} from "../../../components/ui";

const labels = {
  password: "Password",
  document: "Document",
  instruction: "Instruction",
  asset: "Asset",
};
export default function Vault() {
  const q = useVaultItems(),
    del = useDeleteVaultItem(),
    [selected, setSelected] = useState(null);
  if (q.isLoading) return <Loading text="Loading your vault…" />;
  if (q.isError) return <ErrorState error={q.error} retry={q.refetch} />;
  return (
    <>
      <PageHeader
        eyebrow="Private information"
        title="My Vault"
        description={`${q.data.length} item${q.data.length === 1 ? "" : "s"} protected in your personal vault.`}
        action={
          <Link
            href="/vault/new"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
          >
            Add Item
          </Link>
        }
      />
      {q.data.length === 0 ? (
        <EmptyState
          title="Your vault is empty."
          description="Start securing important information."
          action={
            <Link
              href="/vault/new"
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
            >
              Add Vault Item
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {q.data.map((item) => (
            <div key={item.vault_item_id} className="lv-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {labels[item.category] || item.category}
                  </p>
                </div>
                <Badge tone={item.is_always_visible ? "blue" : "neutral"}>
                  {item.is_always_visible
                    ? "Always visible"
                    : "Quorum required"}
                </Badge>
              </div>
              <p className="mt-5 line-clamp-3 whitespace-pre-wrap text-sm text-slate-600">
                {item.category === "password" ? "••••••••••••" : item.content}
              </p>
              <div className="mt-5 flex gap-2">
                <Button variant="secondary" onClick={() => setSelected(item)}>
                  View
                </Button>
                <Link
                  href={`/vault/${item.vault_item_id}/edit`}
                  className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  onClick={() => del.mutate(item.vault_item_id)}
                  loading={
                    del.isPending && del.variables === item.vault_item_id
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        open={!!selected}
        title={selected?.title || "Vault item"}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Category
              </p>
              <p className="mt-1">
                {labels[selected.category] || selected.category}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Content
              </p>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm">
                {selected.category === "password"
                  ? "••••••••••••"
                  : selected.content}
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Created {new Date(selected.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
