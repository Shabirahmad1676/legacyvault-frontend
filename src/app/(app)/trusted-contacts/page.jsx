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
  Loading,
  ErrorState,
  EmptyState,
} from "../../../components/ui";

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M10 4v12M4 10h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="m4 7 6.1 5a3 3 0 0 0 3.8 0L20 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M12 3 20 6v5.5c0 4.8-3.2 8.3-8 9.5-4.8-1.2-8-4.7-8-9.5V6l8-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 12 2.1 2.1 4.4-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.5 19c.5-3.1 2.3-5 5.5-5s5 1.9 5.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M15.5 6.2a3 3 0 0 1 0 5.6M17 14c1.9.7 3 2.1 3.5 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M5.5 20c.7-3.5 2.9-5.5 6.5-5.5s5.8 2 6.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function getInitials(value) {
  if (!value) return "?";

  const parts = value
    .split(/[\s@._-]+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getContactName(contact) {
  return (
    contact?.delegate?.name ||
    contact?.delegate?.email ||
    contact?.contact_id ||
    "Trusted contact"
  );
}

function getContactEmail(contact) {
  return (
    contact?.delegate?.email ||
    contact?.contact_id ||
    ""
  );
}

/* -------------------------------------------------------------------------- */
/* Contact Avatar                                                             */
/* -------------------------------------------------------------------------- */

function ContactAvatar({ name, size = "md" }) {
  const sizes = {
    sm: "h-9 w-9 text-[11px]",
    md: "h-11 w-11 text-xs",
    lg: "h-12 w-12 text-sm",
  };

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center rounded-full",
        "border border-slate-200 bg-slate-100 font-semibold text-slate-600",
        sizes[size],
      ].join(" ")}
    >
      {getInitials(name)}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function Contacts() {
  const q = useTrustedContacts();
  const add = useAddTrustedContact();
  const rem = useRemoveTrustedContact();

  const [open, setOpen] = useState(false);

  if (q.isLoading) {
    return <Loading />;
  }

  if (q.isError) {
    return (
      <ErrorState
        error={q.error}
        retry={q.refetch}
      />
    );
  }

  const contacts = q.data || [];

  return (
    <>
      {/* Header */}

      <PageHeader
        eyebrow="Trust network"
        title="Trusted Contacts"
        description="Choose people who can help protect your legacy in an emergency. Trusted contacts participate in emergency access decisions but never receive permanent vault access."
        action={
          <Button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2"
          >
            <PlusIcon />
            Add trusted contact
          </Button>
        }
      />

      {/* Main Dashboard */}

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">

        {/* LEFT COLUMN */}

        <div className="space-y-5">

          {/* Invitation */}

          <div className="lv-card overflow-hidden rounded-2xl border border-slate-200 bg-white">

            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <MailIcon />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    New Steward Invitation
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Invite someone you trust to join your recovery network.
                  </p>
                </div>

              </div>

            </div>

            <Formik
              initialValues={{
                contact_email: "",
                relationship_label: "",
              }}
              validationSchema={contactSchema}
              onSubmit={async (
                values,
                { setSubmitting, setStatus, resetForm }
              ) => {
                try {
                  await add.mutateAsync(values);

                  resetForm();
                  setOpen(false);
                } catch (e) {
                  setStatus(
                    e?.message ||
                      "Unable to add trusted contact."
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
                status,
              }) => (
                <form onSubmit={handleSubmit}>

                  <div className="grid gap-4 px-5 py-5 md:grid-cols-[1.35fr_1fr_auto] md:items-end md:px-6">

                    <Field
                      label="Email address"
                      error={
                        touched.contact_email &&
                        errors.contact_email
                      }
                    >
                      <Input
                        name="contact_email"
                        type="email"
                        placeholder="name@example.com"
                        value={values.contact_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>

                    <Field
                      label="Relationship"
                      error={
                        touched.relationship_label &&
                        errors.relationship_label
                      }
                    >
                      <Input
                        name="relationship_label"
                        placeholder="Brother, spouse, friend…"
                        value={values.relationship_label}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field>

                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="md:mb-0.5"
                    >
                      Send invite
                    </Button>

                  </div>

                  {status && (
                    <div className="mx-5 mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6">
                      {status}
                    </div>
                  )}

                </form>
              )}
            </Formik>

          </div>

          {/* Contacts */}

          {contacts.length === 0 ? (

            <div className="lv-card rounded-2xl border border-slate-200 bg-white">

              <EmptyState
                title="No trusted contacts yet."
                description="Build your trusted network by adding someone you trust."
                action={
                  <Button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-2"
                  >
                    <PlusIcon />
                    Add Trusted Contact
                  </Button>
                }
              />

            </div>

          ) : (

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Your trusted network
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      People participating in your emergency recovery.
                    </p>
                  </div>

                  <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-600">
                    {contacts.length}
                  </div>

                </div>

              </div>

              <div className="divide-y divide-slate-100">

                {contacts.map((c) => {

                  const name = getContactName(c);
                  const email = getContactEmail(c);

                  const status =
                    c?.status ||
                    c?.invitation_status;

                  const isPending =
                    status === "pending" ||
                    status === "invited" ||
                    status === "pending_invitation";

                  return (
                    <div
                      key={c.trust_link_id}
                      className="group flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50 sm:px-6"
                    >

                      <div className="flex min-w-0 items-center gap-3.5">

                        <ContactAvatar name={name} />

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-900">
                            {name}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">

                            <span className="truncate">
                              {email}
                            </span>

                            {c.relationship_label && (
                              <>
                                <span className="text-slate-300">
                                  •
                                </span>

                                <span>
                                  {c.relationship_label}
                                </span>
                              </>
                            )}

                          </div>

                        </div>

                      </div>

                      <div className="flex shrink-0 items-center gap-3">

                        <span
                          className={[
                            "hidden rounded-full px-2.5 py-1 text-[11px] font-semibold sm:inline-flex",
                            isPending
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-700",
                          ].join(" ")}
                        >
                          {isPending
                            ? "Pending invite"
                            : "Active steward"}
                        </span>

                        <Button
                          variant="danger"
                          className="px-3 py-1.5 text-xs"
                          onClick={() =>
                            rem.mutate(c.trust_link_id)
                          }
                          loading={
                            rem.isPending &&
                            rem.variables ===
                              c.trust_link_id
                          }
                        >
                          Remove
                        </Button>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          )}

        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-5">

          {/* Consensus */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

            <div className="flex items-start justify-between gap-4">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <ShieldIcon />
                </div>

                <div>

                  <h2 className="text-sm font-bold text-slate-900">
                    Consensus Threshold
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    No single point of failure. Access requires
                    multiple trusted contacts to authorize recovery.
                  </p>

                </div>

              </div>

              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                2 of 3 required
              </span>

            </div>

          </div>

          {/* Network */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <UsersIcon />
                </div>

                <div>

                  <h2 className="text-sm font-bold text-slate-900">
                    Trust Network Architecture
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Your trusted contacts and recovery relationship.
                  </p>

                </div>

              </div>

            </div>

            <div className="relative h-[340px] overflow-hidden bg-slate-50/50">

              <div className="absolute left-[25%] right-[25%] top-[105px] h-px bg-slate-200" />

              <div className="absolute left-1/2 top-[105px] h-[105px] w-px -translate-x-1/2 bg-slate-200" />

              {contacts[0] && (
                <div className="absolute left-[14%] top-7 flex w-24 flex-col items-center text-center">

                  <ContactAvatar
                    name={getContactName(contacts[0])}
                    size="sm"
                  />

                  <p className="mt-2 w-full truncate text-[11px] font-semibold text-slate-700">
                    {getContactName(contacts[0])}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Trusted
                  </p>

                </div>
              )}

              {contacts[1] && (
                <div className="absolute right-[14%] top-7 flex w-24 flex-col items-center text-center">

                  <ContactAvatar
                    name={getContactName(contacts[1])}
                    size="sm"
                  />

                  <p className="mt-2 w-full truncate text-[11px] font-semibold text-slate-700">
                    {getContactName(contacts[1])}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Trusted
                  </p>

                </div>
              )}

              <div className="absolute left-1/2 top-[78px] z-10 flex -translate-x-1/2 flex-col items-center">

                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-white bg-slate-800 text-[10px] font-bold tracking-wide text-white shadow-md ring-1 ring-slate-200">
                  YOU
                </div>

                <p className="mt-2 text-[11px] font-bold text-slate-800">
                  Your Vault
                </p>

              </div>

              {contacts[2] && (
                <div className="absolute bottom-7 left-1/2 flex w-24 -translate-x-1/2 flex-col items-center text-center">

                  <ContactAvatar
                    name={getContactName(contacts[2])}
                    size="sm"
                  />

                  <p className="mt-2 w-full truncate text-[11px] font-semibold text-slate-700">
                    {getContactName(contacts[2])}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Trusted
                  </p>

                </div>
              )}

              {contacts.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                    <UsersIcon />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    Your network is empty
                  </p>

                  <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                    Add trusted contacts to build your recovery network.
                  </p>

                </div>
              )}

            </div>

            <div className="border-t border-slate-100 px-5 py-3.5 sm:px-6">

              <div className="flex items-center gap-2 text-xs text-slate-500">

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100">
                  <UserIcon />
                </span>

                <span>
                  {contacts.length} trusted{" "}
                  {contacts.length === 1
                    ? "contact"
                    : "contacts"}{" "}
                  connected
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Add Contact Modal */}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
            }
          }}
        >

          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">

            <div className="mb-5 flex items-start justify-between">

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  Add trusted contact
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add someone to your emergency trust network.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <Formik
              initialValues={{
                contact_email: "",
                relationship_label: "",
              }}
              validationSchema={contactSchema}
              onSubmit={async (
                values,
                { setSubmitting, setStatus }
              ) => {
                try {
                  await add.mutateAsync(values);
                  setOpen(false);
                } catch (e) {
                  setStatus(
                    e?.message ||
                      "Unable to add trusted contact."
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
                status,
              }) => (
                <form
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >

                  <Field
                    label="Contact email"
                    error={
                      touched.contact_email &&
                      errors.contact_email
                    }
                  >
                    <Input
                      name="contact_email"
                      type="email"
                      placeholder="name@example.com"
                      value={values.contact_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Field>

                  <Field
                    label="Relationship"
                    error={
                      touched.relationship_label &&
                      errors.relationship_label
                    }
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
                    <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {status}
                    </p>
                  )}

                  <div className="flex justify-end gap-3">

                    <Button
                      type="button"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      loading={isSubmitting}
                    >
                      Add Contact
                    </Button>

                  </div>

                </form>
              )}
            </Formik>

          </div>

        </div>
      )}
    </>
  );
}