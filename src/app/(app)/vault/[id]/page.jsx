"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ShieldCheck,
  FileText,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";

import {
  useVaultItems,
  useDeleteVaultItem,
} from "../../../../hooks/useLegacyVault";

import {
  Button,
  Badge,
  Loading,
  ErrorState,
} from "../../../../components/ui";

function getCategoryLabel(category) {
  const labels = {
    password: "Password",
    document: "Document",
    instruction: "Instruction",
    asset: "Asset",
  };

  return labels[category] || category;
}

function getVisibilityLabel(isAlwaysVisible) {
  return isAlwaysVisible ? "Always visible" : "Quorum required";
}

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function CategoryIcon({ category }) {
  const iconClass = "h-5 w-5";

  switch (category) {
    case "password":
      return <LockKeyhole className={iconClass} />;

    case "document":
      return <FileText className={iconClass} />;

    case "instruction":
      return <CheckCircle2 className={iconClass} />;

    case "asset":
      return <ShieldCheck className={iconClass} />;

    default:
      return <ShieldCheck className={iconClass} />;
  }
}

export default function VaultItemDetailPage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id;

  const {
    data,
    isLoading,
    isError,
  } = useVaultItems();

  const deleteVaultItem = useDeleteVaultItem();

  const items = data?.data ?? data ?? [];

  const item = items.find(
    (vaultItem) =>
      vaultItem.id === id ||
      vaultItem.vault_item_id === id
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <ErrorState message="Unable to load this vault item." />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl py-12">
        <div className="rounded-2xl border border-[#E1E8E3] bg-white p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF7E9] text-[#087F5B]">
            <ShieldCheck size={22} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-[#0B1F18]">
            Vault item not found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64706A]">
            This vault item may have been deleted or is no longer
            available in your vault.
          </p>

          <button
            onClick={() => router.push("/vault")}
            className="mt-5 text-sm font-semibold text-[#087F5B] hover:underline"
          >
            Back to My Vault
          </button>
        </div>
      </div>
    );
  }

  const itemId = item.id || item.vault_item_id;

  const isAlwaysVisible = Boolean(item.is_always_visible);

  const updatedAt =
    item.updated_at ||
    item.updatedAt ||
    item.created_at;

  const createdAt =
    item.created_at ||
    item.createdAt;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${item.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteVaultItem.mutateAsync(itemId);

      router.push("/vault");
    } catch (error) {
      console.error("Failed to delete vault item:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl"
    >
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={() => router.push("/vault")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64706A] transition hover:text-[#063B2D]"
      >
        <ArrowLeft size={16} />
        Back to My Vault
      </button>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF7E9] text-[#087F5B]">
            <CategoryIcon category={item.category} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-[#0B1F18]">
                {item.title}
              </h1>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isAlwaysVisible
                    ? "bg-[#EEF7E9] text-[#087F5B]"
                    : "bg-[#F1F3F2] text-[#46534D]"
                }`}
              >
                {isAlwaysVisible ? (
                  <Eye size={13} />
                ) : (
                  <EyeOff size={13} />
                )}

                {getVisibilityLabel(isAlwaysVisible)}
              </span>
            </div>

            <p className="mt-1.5 text-sm text-[#64706A]">
              {getCategoryLabel(item.category)}
              {updatedAt && ` · Updated ${formatDate(updatedAt)}`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              router.push(`/vault/${itemId}/edit`)
            }
          >
            <Pencil size={15} />
            Edit
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            disabled={deleteVaultItem.isPending}
          >
            <Trash2 size={15} />
            {deleteVaultItem.isPending
              ? "Deleting..."
              : "Delete"}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Protected content */}
        <motion.section
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden rounded-2xl border border-[#E1E8E3] bg-white shadow-[0_4px_20px_rgba(6,59,45,0.04)]"
        >
          <div className="flex items-center justify-between border-b border-[#E8EDE9] px-6 py-5">
            <div>
              <h2 className="text-sm font-semibold text-[#0B1F18]">
                Vault content
              </h2>

              <p className="mt-1 text-xs text-[#64706A]">
                Information stored inside this vault item.
              </p>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-[#DCE9DF] bg-[#F8FAF7] px-3 py-1.5 text-xs font-medium text-[#087F5B]">
              <ShieldCheck size={13} />
              Protected vault item
            </div>
          </div>

          <div className="p-6">
            <div className="min-h-[280px] rounded-xl border border-[#E1E8E3] bg-[#F8FAF7] p-5">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#64706A]">
                <FileText size={14} />
                Stored information
              </div>

              <div className="whitespace-pre-wrap break-words text-sm leading-7 text-[#26352E]">
                {item.content || "No content available."}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Properties */}
        <aside className="h-fit rounded-2xl border border-[#E1E8E3] bg-white shadow-[0_4px_20px_rgba(6,59,45,0.04)]">
          <div className="border-b border-[#E8EDE9] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#0B1F18]">
              Properties
            </h2>
          </div>

          <div className="divide-y divide-[#E8EDE9]">
            <Property
              label="Category"
              value={getCategoryLabel(item.category)}
            />

            <Property
              label="Access control"
              value={getVisibilityLabel(isAlwaysVisible)}
            />

            <Property
              label="Created"
              value={formatDate(createdAt)}
            />

            <Property
              label="Last updated"
              value={formatDate(updatedAt)}
            />
          </div>

          {/* Access explanation */}
          <div className="m-4 rounded-xl bg-[#EEF7E9] p-4">
            <div className="flex gap-3">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#087F5B]"
              />

              <div>
                <p className="text-xs font-semibold text-[#063B2D]">
                  {isAlwaysVisible
                    ? "Always visible"
                    : "Quorum protected"}
                </p>

                <p className="mt-1 text-xs leading-5 text-[#557066]">
                  {isAlwaysVisible
                    ? "This item is configured to remain available without emergency-access approval."
                    : "Emergency access requires the configured trusted-contact approval threshold."}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

function Property({ label, value }) {
  return (
    <div className="px-5 py-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-[#7A8781]">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-[#26352E]">
        {value}
      </p>
    </div>
  );
}