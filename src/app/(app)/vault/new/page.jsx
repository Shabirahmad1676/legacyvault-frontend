"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import {
  vaultSchema,
} from "@/../schemas/forms";

import {
  useCreateVaultItem,
} from "@/../hooks/useLegacyVault";

import {
  Field,
  Input,
  Textarea,
  Select,
  Button,
} from "@/../components/ui";

import {
  VaultPageMotion,
} from "@/../components/vault/VaultPageMotion";

export default function NewVaultItem() {
  const router = useRouter();
  const mutation = useCreateVaultItem();

  const [error, setError] =
    useState("");

  return (
    <VaultPageMotion>
      {/* Back */}
      <button
        type="button"
        onClick={() => router.back()}
        className="
          mb-3 inline-flex items-center gap-1
          text-[8px] font-medium
          text-[#718078]
          transition-colors
          hover:text-[#063B2D]
        "
      >
        <ArrowLeft className="h-3 w-3" />
        Back to My Vault
      </button>

      {/* Heading */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#087653]">
            My Vault
          </p>

          <h1 className="text-[23px] font-bold tracking-tight text-[#0B1F18]">
            Create vault item
          </h1>

          <p className="mt-1 text-[10px] text-[#718078]">
            Store an important piece of information in your private vault.
          </p>
        </div>

        <div className="hidden items-center gap-1.5 rounded-full border border-[#BFE8D3] bg-[#EAF8F0] px-2.5 py-1.5 sm:flex">
          <ShieldCheck className="h-3 w-3 text-[#087653]" />

          <span className="text-[7px] font-semibold text-[#087653]">
            Secure storage enabled
          </span>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-[720px] rounded-2xl border border-[#E1E8E3] bg-white p-4 shadow-[0_8px_30px_rgba(6,59,45,0.035)] sm:p-5">
        <Formik
          initialValues={{
            category: "password",
            title: "",
            content: "",
            is_always_visible: false,
          }}
          validationSchema={vaultSchema}
          onSubmit={async (
            values,
            { setSubmitting }
          ) => {
            setError("");

            try {
              await mutation.mutateAsync(
                values
              );

              router.replace("/vault");
            } catch (e) {
              setError(
                e?.message ||
                  "Unable to create vault item."
              );
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
            setFieldValue,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Title */}
              <Field
                label="Vault item title"
                error={
                  touched.title &&
                  errors.title
                }
              >
                <Input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Primary Bank Credentials"
                  autoComplete="off"
                />
              </Field>

              {/* Category */}
              <Field
                label="Category"
                error={
                  touched.category &&
                  errors.category
                }
              >
                <Select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="password">
                    Password
                  </option>

                  <option value="document">
                    Document
                  </option>

                  <option value="instruction">
                    Instruction
                  </option>

                  <option value="asset">
                    Asset
                  </option>
                </Select>
              </Field>

              {/* Content */}
              <Field
                label="Vault content"
                error={
                  touched.content &&
                  errors.content
                }
                hint="Store the information exactly as you want it preserved."
              >
                <Textarea
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter the information you want to protect..."
                  className="min-h-[150px]"
                />
              </Field>

              {/* Visibility */}
              <label
                className="
                  flex cursor-pointer
                  items-start gap-3
                  rounded-xl border
                  border-[#E1E8E3]
                  bg-[#F8FAF7]
                  p-3
                  transition-colors
                  hover:border-[#C9D9D0]
                "
              >
                <input
                  type="checkbox"
                  checked={
                    values.is_always_visible
                  }
                  onChange={(e) =>
                    setFieldValue(
                      "is_always_visible",
                      e.target.checked
                    )
                  }
                  className="
                    mt-0.5
                    h-3.5 w-3.5
                    accent-[#063B2D]
                  "
                />

                <span className="flex min-w-0 gap-2.5">
                  <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#087653]" />

                  <span>
                    <span className="block text-[9px] font-semibold text-[#0B1F18]">
                      Always visible
                    </span>

                    <span className="mt-0.5 block text-[8px] leading-4 text-[#718078]">
                      This item can be accessed by an authorized trusted contact without an emergency quorum.
                    </span>
                  </span>
                </span>
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[9px] text-red-700">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 border-t border-[#EDF1EE] pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    router.back()
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  loading={isSubmitting}
                >
                  Create item
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>

      {/* Security note */}
      <div className="mt-3 flex items-center gap-2 text-[8px] text-[#829089]">
        <LockKeyhole className="h-3 w-3 text-[#087653]" />

        <span>
          Access visibility follows your vault settings and trusted network.
        </span>
      </div>
    </VaultPageMotion>
  );
}