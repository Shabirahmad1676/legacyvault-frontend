"use client";

import { useState } from "react";
import { Formik } from "formik";
import { getUser, setSession } from "@/lib/auth";
import { updateQuorum } from "@/api/auth";
import { useTrustedContacts } from "@/hooks/useLegacyVault";
import {
  PageHeader,
  Field,
  Input,
  Button,
} from "@/components/ui";

export default function Security() {
  const u = getUser();
  const c = useTrustedContacts();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const initial = Math.max(1, u?.quorum_threshold || 2);

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Emergency access protection"
        description="Choose how many trusted contacts must approve an emergency access request."
      />
      <div className="lv-card max-w-2xl p-6">
        <div className="mb-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Current trusted contacts: <strong>{c.data?.length ?? 0}</strong>.
          The threshold must be at least 1 and no greater than the number of configured trusted contacts.
        </div>
        <Formik
          enableReinitialize
          initialValues={{ quorum_threshold: initial }}
          onSubmit={async (v, { setSubmitting }) => {
            setErr("");
            setMsg("");
            const n = Number(v.quorum_threshold);

            if (n < 1) {
              setErr("Quorum threshold must be at least 1.");
              setSubmitting(false);
              return;
            }

            if (c.data?.length && n > c.data.length) {
              setErr(
                `Threshold cannot exceed your current trusted-contact count (${c.data.length}).`
              );
              setSubmitting(false);
              return;
            }

            try {
              const r = await updateQuorum(n);
              const next = { ...u, quorum_threshold: r.data.quorum_threshold };
              setSession({
                token: localStorage.getItem("legacyvault_token"),
                user: next,
              });
              setMsg("Quorum threshold updated successfully.");
            } catch (e) {
              setErr(e.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Required approvals">
                <Input
                  name="quorum_threshold"
                  type="number"
                  min="1"
                  max={c.data?.length || undefined}
                  value={values.quorum_threshold}
                  onChange={handleChange}
                />
              </Field>
              {msg && (
                <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                  {msg}
                </p>
              )}
              {err && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {err}
                </p>
              )}
              <Button type="submit" loading={isSubmitting}>
                Save Threshold
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}