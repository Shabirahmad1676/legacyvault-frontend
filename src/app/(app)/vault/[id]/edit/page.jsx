"use client";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import {
  useVaultItems,
  useUpdateVaultItem,
} from "../../../../../hooks/useLegacyVault";
import { vaultSchema } from "../../../../../schemas/forms";
import {
  PageHeader,
  Field,
  Input,
  Textarea,
  Select,
  Button,
  Loading,
  ErrorState,
} from "../../../../../components/ui";
export default function EditVault() {
  const { id } = useParams(),
    router = useRouter(),
    q = useVaultItems(),
    m = useUpdateVaultItem();
  if (q.isLoading) return <Loading />;
  if (q.isError) return <ErrorState error={q.error} />;
  const item = q.data.find((x) => x.vault_item_id === id);
  if (!item) return <ErrorState error={{ message: "Vault item not found." }} />;
  return (
    <>
      <PageHeader eyebrow="My Vault" title="Edit vault item" />
      <div className="lv-card max-w-2xl p-6">
        <Formik
          initialValues={{
            category: item.category,
            title: item.title,
            content: item.content,
            is_always_visible: item.is_always_visible,
          }}
          validationSchema={vaultSchema}
          onSubmit={async (v, { setSubmitting, setStatus }) => {
            try {
              await m.mutateAsync({ id, body: v });
              router.replace("/vault");
            } catch (e) {
              setStatus(e.message);
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
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field
                label="Category"
                error={touched.category && errors.category}
              >
                <Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                >
                  <option value="password">Password</option>
                  <option value="document">Document</option>
                  <option value="instruction">Instruction</option>
                  <option value="asset">Asset</option>
                </Select>
              </Field>
              <Field label="Title" error={touched.title && errors.title}>
                <Input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <Field label="Content" error={touched.content && errors.content}>
                <Textarea
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={values.is_always_visible}
                  onChange={(e) =>
                    setFieldValue("is_always_visible", e.target.checked)
                  }
                />{" "}
                Always visible
              </label>
              {status && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {status}
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
