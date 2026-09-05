"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Clock3,
  Users,
} from "lucide-react";

import {
  Loading,
  ErrorState,
  Badge,
} from "../../../components/ui";

import {
  useVaultItems,
  useTrustedContacts,
  useIncomingAccessRequests,
  useAccessRequestsToVote,
} from "../../../hooks/useLegacyVault";

import { getUser } from "../../../lib/auth";

function StatCard({ label, value, suffix }) {
  return (
    <div className="rounded-xl border border-[#E1E8E3] bg-white px-4 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#718078]">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1.5">
        <p className="text-[18px] font-bold tracking-tight text-[#0B1F18]">
          {value}
        </p>

        {suffix && (
          <span className="text-[9px] font-medium text-[#718078]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ContactStatus({ active }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-2 py-1",
        "text-[8px] font-semibold",
        active
          ? "bg-[#DDF6E9] text-[#087653]"
          : "bg-[#FFF1D8] text-[#98651A]",
      ].join(" ")}
    >
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          active ? "bg-[#10B981]" : "bg-[#D99A2B]",
        ].join(" ")}
      />
      {active ? "Active" : "Pending"}
    </span>
  );
}

export default function Dashboard() {
  const user = getUser();

  const vault = useVaultItems();
  const contacts = useTrustedContacts();
  const incoming = useIncomingAccessRequests();
  const voting = useAccessRequestsToVote();

  const queries = [
    vault,
    contacts,
    incoming,
    voting,
  ];

  if (queries.some((query) => query.isLoading)) {
    return <Loading text="Loading your vault..." />;
  }

  if (queries.some((query) => query.isError)) {
    return (
      <ErrorState
        error={
          vault.error ||
          contacts.error ||
          incoming.error ||
          voting.error
        }
      />
    );
  }

  const vaultItems = vault.data || [];
  const trustedContacts = contacts.data || [];
  const incomingRequests = incoming.data || [];
  const votingRequests = voting.data || [];

  const threshold = user?.quorum_threshold || 0;

  const pendingIncoming = incomingRequests.filter(
    (request) => request.status === "pending"
  );

  const pendingVoting = votingRequests.filter(
    (request) => request.status === "pending"
  );

  const pendingRequests =
    pendingIncoming.length + pendingVoting.length;

  const displayName =
    user?.username ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <div>
      {/* Page heading */}
      <div className="mb-5">
        <h1 className="text-[22px] font-bold tracking-tight text-[#0B1F18] sm:text-[25px]">
          Good morning, {displayName}
        </h1>

        <p className="mt-1 text-[10px] text-[#718078]">
          Your legacy is organized and protected by your trusted network.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <StatCard
          label="Vault items"
          value={vaultItems.length}
          suffix="secure assets"
        />

        <StatCard
          label="Trusted contacts"
          value={trustedContacts.length}
          suffix="active members"
        />

        <StatCard
          label="Active requests"
          value={pendingRequests}
          suffix="pending"
        />

        <StatCard
          label="Emergency quorum"
          value={threshold}
          suffix={`of ${trustedContacts.length} required`}
        />
      </div>

      {/* Main dashboard */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1.6fr_0.9fr]">
        {/* Emergency access */}
        <section className="rounded-2xl border border-[#4E816F] bg-[#EEF7E9] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[12px] font-bold text-[#063B2D]">
                Emergency Access Parameters
              </h2>

              <p className="mt-2 max-w-xl text-[9px] leading-4 text-[#64706A]">
                Your trusted contacts can participate in emergency access
                requests. Access is only granted when the configured approval
                threshold is reached.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#063B2D] px-2 py-1 text-[7px] font-bold uppercase tracking-wide text-[#B8F36B]">
              {threshold} of {trustedContacts.length} configured
            </span>
          </div>

          {trustedContacts.length > 0 ? (
            <div className="mt-4 space-y-2">
              {trustedContacts.slice(0, 4).map((contact) => (
                <div
                  key={contact.trust_link_id}
                  className="flex items-center justify-between rounded-xl border border-[#DCE9D8] bg-white px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DCE9D8] text-[8px] font-bold text-[#063B2D]">
                      {(contact.delegate?.username ||
                        contact.delegate?.email ||
                        contact.contact_id ||
                        "?")
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[9px] font-semibold text-[#0B1F18]">
                        {contact.delegate?.username ||
                          contact.delegate?.email ||
                          contact.contact_id}
                      </p>

                      <p className="text-[8px] text-[#7B8982]">
                        {contact.relationship_label ||
                          "Trusted contact"}
                      </p>
                    </div>
                  </div>

                  <ContactStatus active />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-[#BCD2C4] bg-white/60 p-5 text-center">
              <Users className="mx-auto h-5 w-5 text-[#648B7B]" />

              <p className="mt-2 text-[10px] font-semibold text-[#063B2D]">
                No trusted contacts yet
              </p>

              <Link
                href="/trusted-contacts"
                className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-[#087653]"
              >
                Add trusted contact
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <Link
              href="/trusted-contacts"
              className="text-[9px] font-semibold text-[#087653] hover:underline"
            >
              Manage trusted contacts
            </Link>

            <Link
              href="/settings/security"
              className="text-[9px] font-semibold text-[#087653] hover:underline"
            >
              Configure quorum
            </Link>
          </div>
        </section>

        {/* Right column */}
        <div className="space-y-3.5">
          {/* Active requests */}
          <section className="rounded-2xl border border-[#E1E8E3] bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-bold text-[#0B1F18]">
                Active Access Requests
              </h2>

              <Link
                href="/access-requests"
                className="text-[10px] font-semibold text-[#087653]"
              >
                View all
              </Link>
            </div>

            {pendingIncoming.length > 0 ||
            pendingVoting.length > 0 ? (
              <div className="mt-3 space-y-2">
                {[
                  ...pendingIncoming,
                  ...pendingVoting,
                ]
                  .slice(0, 2)
                  .map((request) => (
                    <div
                      key={request.request_id}
                      className="rounded-xl border border-[#EADFD8] bg-[#FFF9F6] p-3"
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B95D45]" />

                        <div className="min-w-0">
                          <p className="text-[9px] font-semibold text-[#8E4534]">
                            Emergency access request
                          </p>

                          <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-[#756B66]">
                            {request.reason ||
                              "A trusted contact has submitted an access request."}
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/access-requests"
                        className="mt-2 inline-flex items-center gap-1 text-[8px] font-semibold text-[#063B2D]"
                      >
                        Review request
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <Check className="mx-auto h-5 w-5 text-[#10B981]" />

                <p className="mt-2 text-[9px] font-medium text-[#718078]">
                  No active access requests
                </p>
              </div>
            )}
          </section>

          {/* Security summary */}
          <section className="rounded-2xl border border-[#E1E8E3] bg-white p-4">
            <h2 className="text-[11px] font-bold text-[#0B1F18]">
              Security Overview
            </h2>

            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5F6ED] text-[#087653]">
                  <ShieldIcon />
                </div>

                <div>
                  <p className="text-[9px] font-semibold text-[#0B1F18]">
                    Trusted network
                  </p>

                  <p className="text-[8px] text-[#7B8982]">
                    {trustedContacts.length} contact
                    {trustedContacts.length === 1 ? "" : "s"} configured
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFF2D9] text-[#98651A]">
                  <Clock3 className="h-3 w-3" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold text-[#0B1F18]">
                    Approval threshold
                  </p>

                  <p className="text-[8px] text-[#7B8982]">
                    {threshold} approval
                    {threshold === 1 ? "" : "s"} required
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/activity"
              className="mt-4 flex items-center gap-1 text-[8px] font-semibold text-[#087653]"
            >
              View security activity
              <ArrowRight className="h-3 w-3" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" stroke="currentColor"  strokeWidth="2">
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
    </svg>
  );
}