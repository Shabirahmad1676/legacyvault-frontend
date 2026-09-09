"use client";

import React from "react";
import Link from "next/link";
import {
  PageHeader,
  Loading,
  ErrorState,
  EmptyState,
  Badge,
} from "@/components/ui";
import {
  useIncomingAccessRequests,
  useAccessRequestsToVote,
} from "@/hooks/useLegacyVault";

function RequestCard({ r, incoming }) {
  const owner = r.TrustedContact?.vault_owner?.email;
  const delegate = r.TrustedContact?.delegate?.email;
  const isRejected = r.status === "rejected" || r.status === "denied";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-bold text-[#0B1F18]">
            {incoming ? (
              <>
                <span className="text-xs font-normal text-slate-400 block">
                  Requested by
                </span>
                {delegate || "Trusted Contact"}
              </>
            ) : (
              <>
                <span className="text-xs font-normal text-slate-400 block">
                  Vault Owner
                </span>
                {owner || "Vault Owner"}
              </>
            )}
          </p>
          <p className="mt-2 text-sm text-slate-600">{r.reason}</p>
        </div>
        <Badge
          tone={
            r.status === "approved"
              ? "green"
              : isRejected
                ? "red"
                : r.status === "expired"
                  ? "neutral"
                  : "amber"
          }
        >
          {r.status}
        </Badge>
      </div>

      <div className="mt-4 grid gap-1 text-xs text-slate-500">
        <span>Created: {new Date(r.created_at).toLocaleString()}</span>
        <span>Expires: {new Date(r.expires_at).toLocaleString()}</span>
      </div>

      <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
        <Link
          href={`/access-requests/${r.request_id}`}
          className="inline-flex rounded-lg bg-[#063B2D] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#07503D]"
        >
          {incoming ? "View Audit Details" : "Review & Vote"}
        </Link>
      </div>
    </div>
  );
}

export default function AccessRequestsPage() {
  const a = useIncomingAccessRequests();
  const v = useAccessRequestsToVote();

  if (a.isLoading || v.isLoading) {
    return <Loading text="Loading emergency access requests..." />;
  }

  if (a.isError) return <ErrorState error={a.error} />;
  if (v.isError) return <ErrorState error={v.error} />;

  const incomingRequests = a.data || [];
  const votingRequests = v.data || [];

  return (
    <>
      <PageHeader
        eyebrow="Emergency access"
        title="Access Requests"
        description="Review emergency requests made against your vault and pending requests awaiting your vote."
        action={
          <Link
            href="/access-requests/new"
            className="rounded-lg bg-[#063B2D] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#07503D]"
          >
            Request Access
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Incoming Requests (Vault Owner View) */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Requests for Your Vault
            </h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {incomingRequests.length}
            </span>
          </div>

          {incomingRequests.length ? (
            <div className="space-y-3">
              {incomingRequests.map((r) => (
                <RequestCard key={r.request_id} r={r} incoming={true} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No incoming emergency requests."
              description="Requests submitted against your vault will appear here for audit tracking."
            />
          )}
        </section>

        {/* Voting Requests (Trusted Contact View) */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Awaiting Your Vote
            </h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {votingRequests.length}
            </span>
          </div>

          {votingRequests.length ? (
            <div className="space-y-3">
              {votingRequests.map((r) => (
                <RequestCard key={r.request_id} r={r} incoming={false} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No requests require your vote."
              description="You have no pending quorum votes from your trust network."
            />
          )}
        </section>
      </div>
    </>
  );
}