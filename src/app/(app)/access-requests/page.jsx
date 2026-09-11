"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  useIncomingAccessRequests, 
  useAccessRequestsToVote, 
  useVoteOnAccessRequest 
} from "@/hooks/useLegacyVault";
import { getUser } from "@/lib/auth";
import { Loading, ErrorState, EmptyState } from "@/components/ui";

export default function AccessRequestsPage() {
  const [activeTab, setActiveTab] = useState("all"); // "all", "incoming", "to-vote"

  const incomingQuery = useIncomingAccessRequests();
  const votingQuery = useAccessRequestsToVote();
  const voteMutation = useVoteOnAccessRequest();
  const currentUser = getUser();

  if (incomingQuery.isLoading || votingQuery.isLoading) {
    return <Loading text="Loading access requests..." />;
  }

  if (incomingQuery.isError || votingQuery.isError) {
    return <ErrorState error={incomingQuery.error || votingQuery.error} />;
  }

  const incomingRequests = incomingQuery.data || [];
  const votingRequests = votingQuery.data || [];

  const handleQuickVote = async (requestId, decision, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await voteMutation.mutateAsync({ requestId, decision });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Access Requests
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Review, approve, or object to emergency vault unlock requests.
        </p>
      </div>

      {/* Pill Toggle Filters */}
      <div className="mb-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("incoming")}
          className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
            activeTab === "incoming" || activeTab === "all"
              ? "bg-[#0B3B2C] text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          Incoming (Active)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("to-vote")}
          className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
            activeTab === "to-vote"
              ? "bg-[#0B3B2C] text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          To Vote (Pending Review)
        </button>
      </div>

      {/* 2-Column Responsive Dashboard */}
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* LEFT COLUMN: Incoming Requests */}
        {(activeTab === "all" || activeTab === "incoming") && (
          <div>
            <h2 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Incoming Emergency Requests
            </h2>

            {incomingRequests.length === 0 ? (
              <EmptyState
                title="No incoming requests"
                description="Requests made against your vault will appear here for audit."
              />
            ) : (
              <div className="space-y-4">
                {incomingRequests.map((r) => {
                  const requester = r.TrustedContact?.delegate;
                  const requesterName = requester?.username || requester?.email?.split("@")[0] || "Steward";
                  const votes = r.votes || r.Votes || [];
                  const approvals = votes.filter((v) => v.decision === "approve").length;
                  const threshold = r.TrustedContact?.vault_owner?.quorum_threshold || 2;

                  return (
                    <Link
                      key={r.request_id}
                      href={`/access-requests/${r.request_id}`}
                      className="block rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 border border-slate-200">
                            {requesterName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 capitalize">
                              {requesterName}
                            </h3>
                            <p className="text-xs text-slate-400">
                              {r.TrustedContact?.relationship_label || "Trusted Contact"}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          Pending — {approvals} of {threshold} approvals
                        </span>
                      </div>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Reason for Access
                        </p>
                        <p className="mt-1 text-sm text-slate-700 italic">
                          &ldquo;{r.reason}&rdquo;
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-wider">Created</span>
                          <span className="text-slate-600 font-medium">
                            {new Date(r.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] font-bold uppercase tracking-wider">Time Remaining</span>
                          <span className="font-medium text-red-500">
                            Voting window active
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* RIGHT COLUMN: Steward Votes Pending */}
        {(activeTab === "all" || activeTab === "to-vote") && (
          <div>
            <h2 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Steward Votes Pending
            </h2>

            {votingRequests.length === 0 ? (
              <EmptyState
                title="No pending votes"
                description="You are caught up on all emergency access petitions."
              />
            ) : (
              <div className="space-y-4">
                {votingRequests.map((r) => {
                  const owner = r.TrustedContact?.vault_owner;
                  const ownerName = owner?.username || owner?.email?.split("@")[0] || "Vault Owner";
                  const votes = r.votes || r.Votes || [];
                  const threshold = owner?.quorum_threshold || 2;
                  const hasVoted = votes.some(
                    (v) => v.voter_contact?.contact_id === currentUser?.user_id
                  );

                  return (
                    <div
                      key={r.request_id}
                      className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">
                            Petition for {ownerName}&apos;s Vault
                          </h3>
                          <p className="mt-1 text-xs text-slate-400">
                            Owner: {owner?.email}
                          </p>
                        </div>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                          {threshold} of 3 Required
                        </span>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        <span className="font-semibold text-slate-700">Reason: </span>
                        {r.reason}
                      </p>

                      {/* Steward Signatures List */}
                      <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
                        {votes.map((v) => {
                          const delegate = v.voter_contact?.delegate || v.TrustedContact?.delegate;
                          const isCurrent = delegate?.user_id === currentUser?.user_id;
                          return (
                            <div key={v.vote_id} className="flex items-center justify-between text-xs py-1">
                              <span className="text-slate-600 font-medium">
                                {delegate?.username || delegate?.email} {isCurrent && "(You)"}
                              </span>
                              <span
                                className={`font-semibold ${
                                  v.decision === "approve" ? "text-emerald-600" : "text-red-600"
                                }`}
                              >
                                {v.decision === "approve" ? "Approved" : "Denied"}
                              </span>
                            </div>
                          );
                        })}

                        {!hasVoted && (
                          <div className="flex items-center justify-between text-xs py-1">
                            <span className="font-bold text-slate-900">You ({currentUser?.username || "Steward"})</span>
                            <span className="font-semibold text-amber-600">Pending Your Vote</span>
                          </div>
                        )}
                      </div>

                      {/* Inline Actions */}
                      {!hasVoted && r.status === "pending" && (
                        <div className="mt-6 flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            disabled={voteMutation.isPending}
                            onClick={(e) => handleQuickVote(r.request_id, "approve", e)}
                            className="flex-1 rounded-xl bg-[#0B3B2C] py-3 text-xs font-semibold text-white transition hover:bg-[#08503B] disabled:opacity-50"
                          >
                            Approve Unlock
                          </button>
                          <button
                            type="button"
                            disabled={voteMutation.isPending}
                            onClick={(e) => handleQuickVote(r.request_id, "deny", e)}
                            className="flex-1 rounded-xl border border-red-200 bg-white py-3 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            Deny Request
                          </button>
                        </div>
                      )}

                      <div className="mt-4 text-center">
                        <Link
                          href={`/access-requests/${r.request_id}`}
                          className="text-xs font-semibold text-[#0B3B2C] hover:underline"
                        >
                          View Full Verification Progress &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}