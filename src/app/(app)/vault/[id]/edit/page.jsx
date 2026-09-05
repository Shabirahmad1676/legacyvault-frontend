"use client";

import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import {
  useVaultItems,
  useUpdateVaultItem,
} from "../../../../../hooks/useLegacyVault";

import {
  Button,
  Field,
  Input,
  Textarea,
  Select,
  Loading,
  ErrorState,
} from "../../../../../components/ui";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(150, "Title is too long"),

  category: Yup.string()
    .oneOf(["password", "document", "instruction", "asset"])
    .required("Category is required"),

  content: Yup.string()
    .required("Content is required"),

  is_always_visible: Yup.boolean(),
});

export default function EditVaultItemPage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id;

  const { data, isLoading, isError } = useVaultItems();
  const updateVaultItem = useUpdateVaultItem();

  const items = data?.data ?? data ?? [];

  const item = items.find(
    (vaultItem) => vaultItem.id === id || vaultItem.vault_item_id === id
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
        <ErrorState message="Unable to load vault item." />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="p-8">
        <div className="rounded-2xl border border-[#E1E8E3] bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-[#0B1F18]">
            Vault item not found
          </h2>

          <p className="mt-2 text-sm text-[#64706A]">
            This vault item may have been deleted or is no longer available.
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

  const initialValues = {
    title: item.title || "",
    category: item.category || "asset",
    content: item.content || "",
    is_always_visible: Boolean(item.is_always_visible),
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateVaultItem.mutateAsync({
        id: itemId,
        body: {
          title: values.title,
          category: values.category,
          content: values.content,
          is_always_visible: values.is_always_visible,
        },
      });

      router.push(`/vault/${itemId}`);
    } catch (error) {
      console.error("Failed to update vault item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl"
    >
      {/* Breadcrumb */}
      <button
        type="button"
        onClick={() => router.push(`/vault/${itemId}`)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#64706A] transition hover:text-[#063B2D]"
      >
        <ArrowLeft size={16} />
        Back to vault item
      </button>

      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0B1F18]">
            Edit vault item
          </h1>

          <p className="mt-1 text-sm text-[#64706A]">
            Update the information stored in this vault item.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-[#DCE9DF] bg-[#EEF7E9] px-3 py-1.5 text-xs font-semibold text-[#087F5B] sm:flex">
          <ShieldCheck size={14} />
          Private vault storage
        </div>
      </div>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form>
            <div className="rounded-2xl border border-[#E1E8E3] bg-white shadow-[0_4px_20px_rgba(6,59,45,0.04)]">
              <div className="border-b border-[#E8EDE9] px-6 py-5">
                <h2 className="text-sm font-semibold text-[#0B1F18]">
                  Vault information
                </h2>

                <p className="mt-1 text-xs text-[#64706A]">
                  Keep the details accurate so your trusted contacts can
                  understand them when access is required.
                </p>
              </div>

              <div className="space-y-6 p-6">
                {/* Title */}
                <Field
                  label="Title"
                  error={touched.title ? errors.title : undefined}
                >
                  <Input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Bank Information"
                  />
                </Field>

                {/* Category */}
                <Field
                  label="Category"
                  error={touched.category ? errors.category : undefined}
                >
                  <Select
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="password">Password</option>
                    <option value="document">Document</option>
                    <option value="instruction">Instruction</option>
                    <option value="asset">Asset</option>
                  </Select>
                </Field>

                {/* Content */}
                <Field
                  label="Content"
                  error={touched.content ? errors.content : undefined}
                >
                  <Textarea
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={10}
                    placeholder="Enter the information you want to keep in your vault..."
                  />
                </Field>

                {/* Always visible */}
                <div className="rounded-xl border border-[#E1E8E3] bg-[#F8FAF7] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#0B1F18]">
                        Always visible
                      </p>

                      <p className="mt-1 max-w-xl text-xs leading-5 text-[#64706A]">
                        If enabled, this item can be viewed without waiting
                        for emergency-access quorum approval.
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={values.is_always_visible}
                      onClick={() =>
                        setFieldValue(
                          "is_always_visible",
                          !values.is_always_visible
                        )
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        values.is_always_visible
                          ? "bg-[#10B981]"
                          : "bg-[#CBD5D0]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                          values.is_always_visible
                            ? "left-6"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-[#E8EDE9] bg-[#FCFDFC] px-6 py-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push(`/vault/${itemId}`)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting || updateVaultItem.isPending}
                >
                  <Save size={16} />
                  {isSubmitting || updateVaultItem.isPending
                    ? "Saving..."
                    : "Save changes"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}