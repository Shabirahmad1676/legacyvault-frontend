"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  useAccessRequestsToVote, 
  useIncomingAccessRequests, 
  useVoteOnAccessRequest,
  useSharedVaultItems 
} from "@/hooks/useLegacyVault";
import { getUser } from "@/lib/auth";
import { Loading, ErrorState, Modal } from "@/components/ui";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const currentUser = getUser();

  const votingQuery = useAccessRequestsToVote();
  const incomingQuery = useIncomingAccessRequests();
  const voteMutation = useVoteOnAccessRequest();

  const [confirmDecision, setConfirmDecision] = useState(null);

  if (votingQuery.isLoading || incomingQuery.isLoading) {
    return <Loading text="Loading verification details..." />;
  }

  const allRequests = [
    ...(votingQuery.data || []),
    ...(incomingQuery.data || []),
  ];

  const request = allRequests.find((x) => x.request_id === id);

  if (!request) {
    return (
      <ErrorState
        error={{ message: "This request does not exist or you do not have permission to view it." }}
      />
    );
  }

  const owner = request.TrustedContact?.vault_owner;
  const requester = request.TrustedContact?.delegate;
  const votes = request.votes || request.Votes || [];
  const approvalsCount = votes.filter((v) => v.decision === "approve").length;
  const threshold = owner?.quorum_threshold || 2;

  const isOwner = currentUser?.user_id === request.TrustedContact?.owner_id;
  const isRequester = currentUser?.user_id === request.TrustedContact?.contact_id;
  const hasVoted = votes.some(
    (v) => v.voter_contact?.contact_id === currentUser?.user_id
  );

  const canVote = !isOwner && !isRequester && !hasVoted && request.status === "pending";

  const requesterName = requester?.username || requester?.email?.split("@")[0] || "Steward";

  return (
    <div className="mx-auto max-w-7xl">
      {/* Top Breadcrumb */}
      <Link
        href="/access-requests"
        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
      >
        &larr; Back to All Requests
      </Link>

      {/* Main Header with Safety Delay Pill */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Emergency Access Request
        </h1>
        <span className="rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-semibold text-amber-800">
          24h Safety Delay Active
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Card 1: Request Metadata & Reason */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-700 border border-slate-200">
                  {requesterName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 capitalize">
                    {requesterName}
                  </h2>
                  <p className="text-xs text-slate-400">Requesting Steward</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                46 hours remaining
              </span>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Reason for Emergency Unlock
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 italic">
                &ldquo;{request.reason}&rdquo;
              </p>

              <p className="mt-6 text-xs text-slate-400">
                <span className="font-semibold text-slate-500">Request Created:</span>{" "}
                {new Date(request.created_at).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                &bull; {new Date(request.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          {/* Card 2: Required Quorum Status & Actions */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold text-slate-900">Required Quorum Status</h3>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {approvalsCount} of 3 approvals, {threshold} required
              </span>
            </div>

            {canVote ? (
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setConfirmDecision("approve")}
                  className="flex-1 rounded-2xl bg-[#09B172] py-3.5 text-sm font-semibold text-white transition hover:bg-[#079962]"
                >
                  Approve Request
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDecision("deny")}
                  className="flex-1 rounded-2xl border border-red-300 bg-white py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Deny Request
                </button>
              </div>
            ) : (
              <p className="mt-6 text-xs text-slate-400">
                {isOwner
                  ? "As the vault owner, you have full audit view of this emergency request."
                  : hasVoted
                    ? "Your vote has been submitted for this quorum."
                    : "This emergency request has already been finalized."}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Card 1: Steward Verification Progress */}
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-5">
              Steward Verification Progress
            </h3>

            <div className="space-y-3">
              {/* Render vote states */}
              {votes.map((v) => {
                const delegate = v.voter_contact?.delegate || v.TrustedContact?.delegate;
                const name = delegate?.username || delegate?.email?.split("@")[0] || "Steward";
                return (
                  <div
                    key={v.vote_id}
                    className="flex items-center justify-between rounded-2xl bg-slate-50/70 p-3.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700 text-xs">
                        {name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{name}</p>
                        <p className="text-[10px] text-slate-400">Steward</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                      &bull; {v.decision === "approve" ? "Approved" : "Denied"}
                    </span>
                  </div>
                );
              })}

              {/* Awaiting current user vote if pending */}
              {canVote && (
                <div className="flex items-center justify-between rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-800 text-xs">
                      YOU
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {currentUser?.username || "You"} (You)
                      </p>
                      <p className="text-[10px] text-slate-400">Designated Steward</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-800">
                    &bull; Awaiting You
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Preview if Quorum Reached Container */}
          <div className="rounded-3xl bg-[#063B2D] p-7 text-white shadow-md">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Preview if Quorum Reached
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                Access Approved
              </span>
            </div>

            <h4 className="mt-4 text-sm font-bold tracking-wide">
              QUORUM REACHED, ACCESS APPROVED
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Upon the required approvals, the following primary vault payloads will
              automatically decrypt for {requesterName}:
            </p>

            <ul className="mt-4 space-y-2 text-xs font-medium text-emerald-300">
              <li className="flex items-center gap-2">
                &bull; <span>Primary Vault Financial Credentials</span>
              </li>
              <li className="flex items-center gap-2">
                &bull; <span>United Trust Health Directives & Documents</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={!!confirmDecision}
        title={`${confirmDecision === "approve" ? "Approve" : "Deny"} Access Request?`}
        onClose={() => setConfirmDecision(null)}
      >
        <p className="text-xs leading-relaxed text-slate-600">
          Your vote will be permanently cryptographically signed into the access log.
          Are you sure you want to proceed with {confirmDecision}?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setConfirmDecision(null)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={voteMutation.isPending}
            onClick={async () => {
              try {
                await voteMutation.mutateAsync({ requestId: id, decision: confirmDecision });
                setConfirmDecision(null);
                router.replace("/access-requests");
              } catch (err) {
                alert(err.message);
              }
            }}
            className={`rounded-xl px-5 py-2 text-xs font-semibold text-white ${
              confirmDecision === "approve" ? "bg-[#09B172] hover:bg-[#079962]" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {voteMutation.isPending ? "Submitting..." : `Confirm ${confirmDecision}`}
          </button>
        </div>
      </Modal>
    </div>
  );
}