"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Formik } from "formik";
import { requestSchema } from "@/schemas/forms";
import { useCreateAccessRequest, useAssignedVaults } from "@/hooks/useLegacyVault";
import { Loading, ErrorState } from "@/components/ui";

export default function NewAccessRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedOwnerId = searchParams.get("owner_id") || "";

  const createRequestMutation = useCreateAccessRequest();
  const { data: vaults = [], isLoading, isError, error } = useAssignedVaults();

  if (isLoading) return <Loading text="Loading accessible vaults..." />;
  if (isError) return <ErrorState error={error} />;

  // Default to preselected owner or the first assigned vault
  const initialOwnerId = preselectedOwnerId || (vaults[0]?.owner_id ?? "");

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/shared-vaults"
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
      >
        &larr; Back to Shared Vaults
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">
        Request Emergency Access
      </h1>

      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Submit a New Access Request
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Vault encryption keys are secure. Access will only be granted if the required
          consensus quorum is reached. An emergency safety delay will be triggered upon
          submission.
        </p>

        <Formik
          initialValues={{
            target_owner_id: initialOwnerId,
            reason: "",
          }}
          validationSchema={requestSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              await createRequestMutation.mutateAsync(values);
              router.replace("/access-requests");
            } catch (err) {
              setStatus(err.message || "Failed to submit request.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            status,
          }) => (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Target Vault Owner
                </label>
                <select
                  name="target_owner_id"
                  value={values.target_owner_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0B3B2C] focus:bg-white"
                >
                  <option value="" disabled>
                    Select target vault owner...
                  </option>
                  {vaults.map((v) => (
                    <option key={v.owner_id} value={v.owner_id}>
                      {v.vault_owner?.username || v.vault_owner?.email} ({v.relationship_label})
                    </option>
                  ))}
                </select>
                {touched.target_owner_id && errors.target_owner_id && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.target_owner_id}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Reason for Emergency Request
                </label>
                <textarea
                  name="reason"
                  rows={5}
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describe why emergency access is needed..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B3B2C] focus:bg-white resize-y"
                />
                {touched.reason && errors.reason && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.reason}</p>
                )}
              </div>

              {status && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
                  {status}
                </div>
              )}

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-xl bg-[#0B3B2C] py-3.5 text-sm font-semibold text-white transition hover:bg-[#08503B] disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting Request..." : "Submit Access Request"}
                </button>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}