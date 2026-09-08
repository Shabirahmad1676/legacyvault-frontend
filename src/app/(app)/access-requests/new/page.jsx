"use client";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { requestSchema } from "@/schemas/forms";
import { useCreateAccessRequest, useAssignedVaults } from "@/hooks/useLegacyVault";
import { PageHeader, Field, Select, Textarea, Button, Loading, ErrorState } from "@/components/ui";

export default function NewRequest() {
  const router = useRouter();
  const m = useCreateAccessRequest();
  const { data: vaults, isLoading, isError } = useAssignedVaults();

  if (isLoading) return <Loading text="Loading available vaults..." />;
  if (isError) return <ErrorState error={{ message: "Failed to load vaults." }} />;

  return (
    <>
      <PageHeader
        eyebrow="Emergency access"
        title="Request emergency access"
        description="Select a vault and provide your reasoning for access."
      />
      <div className="lv-card max-w-2xl p-6">
        <Formik
          initialValues={{ target_owner_id: "", reason: "" }}
          validationSchema={requestSchema}
          onSubmit={async (v, { setSubmitting, setStatus }) => {
            try {
              await m.mutateAsync(v);
              router.replace("/access-requests");
            } catch (e) {
              setStatus(e.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status }) => (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Field
                label="Target Vault"
                error={touched.target_owner_id && errors.target_owner_id}
              >
                <Select
                  name="target_owner_id"
                  value={values.target_owner_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>Select a vault...</option>
                  {vaults?.map((v) => (
                    <option key={v.owner_id} value={v.owner_id}>
                      {v.vault_owner?.email} ({v.relationship_label})
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Reason" error={touched.reason && errors.reason}>
                <Textarea
                  name="reason"
                  maxLength={500}
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Explain why emergency access is needed."
                />
              </Field>

              {status && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{status}</p>}

              <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" loading={isSubmitting}>Submit Request</Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}