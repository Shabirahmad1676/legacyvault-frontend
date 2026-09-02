"use client";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { vaultSchema } from "../../../../schemas/forms";
import { useCreateVaultItem } from "../../../../hooks/useLegacyVault";
import {
  PageHeader,
  Field,
  Input,
  Textarea,
  Select,
  Button,
} from "../../../../components/ui";
export default function NewVaultItem() {
  const router = useRouter(),
    m = useCreateVaultItem(),
    [err, setErr] = useState("");
  return (
    <>
      <PageHeader
        eyebrow="My Vault"
        title="Add vault item"
        description="Store an important piece of information in your private vault."
      />
      <div className="lv-card max-w-2xl p-6">
        <Formik
          initialValues={{
            category: "password",
            title: "",
            content: "",
            is_always_visible: false,
          }}
          validationSchema={vaultSchema}
          onSubmit={async (v, { setSubmitting }) => {
            setErr("");
            try {
              await m.mutateAsync(v);
              router.replace("/vault");
            } catch (e) {
              setErr(e.message);
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field
                label="Category"
                error={touched.category && errors.category}
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
              <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={values.is_always_visible}
                  onChange={(e) =>
                    setFieldValue("is_always_visible", e.target.checked)
                  }
                />{" "}
                Always visible to an authorized trusted contact before quorum
              </label>
              {err && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {err}
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
                  Save Item
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
