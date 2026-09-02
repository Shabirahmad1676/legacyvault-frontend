"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSharedVaultItems } from "../../../../hooks/useLegacyVault";
import { PageHeader, Button, Loading, ErrorState, EmptyState, Badge, Modal } from "../../../../components/ui";

const labels = {
  password: "Password",
  document: "Document",
  instruction: "Instruction",
  asset: "Asset",
};

export default function SharedVaultView() {
  const { owner_id } = useParams();
  const router = useRouter();
  const q = useSharedVaultItems(owner_id);
  const [selected, setSelected] = useState(null);

  if (q.isLoading) return <Loading text="Decrypting shared vault..." />;
  if (q.isError) return <ErrorState error={q.error} retry={q.refetch} />;

  return (
    <>
      <PageHeader
        eyebrow="Emergency Access"
        title="Shared Vault"
        description="Viewing available items. Quorum-protected items remain hidden until an access request is approved."
        action={
          <Button variant="secondary" onClick={() => router.back()}>
            Back to Network
          </Button>
        }
      />
      
      {q.data?.length === 0 ? (
        <EmptyState
          title="No accessible items."
          description="This vault contains no 'always visible' items, and you do not have an approved emergency access request."
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
                <Badge tone={item.is_always_visible ? "blue" : "amber"}>
                  {item.is_always_visible ? "Always visible" : "Quorum unlocked"}
                </Badge>
              </div>
              <p className="mt-5 line-clamp-3 whitespace-pre-wrap text-sm text-slate-600">
                {item.category === "password" ? "••••••••••••" : item.content}
              </p>
              <div className="mt-5 flex gap-2">
                <Button variant="primary" onClick={() => setSelected(item)}>
                  View Securely
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
              <p className="text-xs font-bold uppercase text-slate-400">Category</p>
              <p className="mt-1">{labels[selected.category] || selected.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">Content</p>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
                {selected.content}
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