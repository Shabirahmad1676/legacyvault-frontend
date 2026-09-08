"use client";
import Link from "next/link";
import { PageHeader, Loading, ErrorState, EmptyState, Badge } from "@/components/ui";
import { useAssignedVaults } from "@/hooks/useLegacyVault";

export default function SharedVaultsList() {
  const q = useAssignedVaults();

  if (q.isLoading) return <Loading text="Fetching trusted networks..." />;
  if (q.isError) return <ErrorState error={q.error} retry={q.refetch} />;

  return (
    <>
      <PageHeader
        eyebrow="Trust network"
        title="Shared Vaults"
        description="Vaults where you have been designated as a trusted contact."
      />
      
      {q.data?.length === 0 ? (
        <EmptyState
          title="No shared vaults."
          description="You have not been added as a trusted contact to any vaults yet."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {q.data.map((link) => (
            <Link 
              href={`/shared-vaults/${link.owner_id}`}
              key={link.trust_link_id} 
              className="lv-card p-5 transition-all hover:border-emerald-500/30 hover:shadow-md block cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-900">{link.vault_owner?.email}</h2>
                  <p className="mt-1 text-xs text-slate-500">Owner</p>
                </div>
                <Badge tone="green">{link.relationship_label}</Badge>
              </div>
              <div className="mt-5 text-sm text-emerald-600 font-semibold">
                Access Vault &rarr;
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}