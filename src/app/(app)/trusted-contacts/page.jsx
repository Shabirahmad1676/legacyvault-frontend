"use client";
import { Formik } from "formik";
import { useState } from "react";
import { contactSchema } from "../../../schemas/forms";
import {
  useTrustedContacts,
  useAddTrustedContact,
  useRemoveTrustedContact,
} from "../../../hooks/useLegacyVault";
import {
  PageHeader,
  Field,
  Input,
  Button,
  Modal,
  Loading,
  ErrorState,
  EmptyState,
} from "../../../components/ui";
export default function Contacts() {
  const q = useTrustedContacts(),
    add = useAddTrustedContact(),
    rem = useRemoveTrustedContact(),
    [open, setOpen] = useState(false);
  if (q.isLoading) return <Loading />;
  if (q.isError) return <ErrorState error={q.error} retry={q.refetch} />;
  return (
    <>
      <PageHeader
        eyebrow="Trust network"
        title="Trusted Contacts"
        description="Trusted contacts participate in emergency access decisions. They do not receive permanent vault access."
        action={
          <Button onClick={() => setOpen(true)}>Add Trusted Contact</Button>
        }
      />
      {q.data.length === 0 ? (
        <EmptyState
          title="No trusted contacts yet."
          description="Build your trusted network."
          action={
            <Button onClick={() => setOpen(true)}>Add Trusted Contact</Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {q.data.map((c) => (
            <div className="lv-card p-5" key={c.trust_link_id}>
              <p className="font-bold">{c.delegate?.email || c.contact_id}</p>
              <p className="mt-1 text-sm text-slate-500">
                {c.relationship_label}
              </p>
              <Button
                variant="danger"
                className="mt-5"
                onClick={() => rem.mutate(c.trust_link_id)}
                loading={rem.isPending && rem.variables === c.trust_link_id}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
      <Modal
        open={open}
        title="Add trusted contact"
        onClose={() => setOpen(false)}
      >
        <Formik
          initialValues={{ contact_email: "", relationship_label: "" }}
          validationSchema={contactSchema}
          onSubmit={async (v, { setSubmitting, setStatus }) => {
            try {
              await add.mutateAsync(v);
              setOpen(false);
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
          }) => (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Field
                label="Contact email"
                error={touched.contact_email && errors.contact_email}
              >
                <Input
                  name="contact_email"
                  value={values.contact_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              <Field
                label="Relationship"
                error={touched.relationship_label && errors.relationship_label}
              >
                <Input
                  name="relationship_label"
                  placeholder="Brother, spouse, friend…"
                  value={values.relationship_label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {status && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {status}
                </p>
              )}
              <Button type="submit" loading={isSubmitting}>
                Add Contact
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
