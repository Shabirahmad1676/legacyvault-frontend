"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  useAccessRequestsToVote,
  useIncomingAccessRequests,
  useVoteOnAccessRequest,
} from "@/hooks/useLegacyVault";
import { getUser } from "@/lib/auth";
import {
  PageHeader,
  Button,
  Loading,
  ErrorState,
  Badge,
  Modal,
} from "@/components/ui";
import { QuorumProgress } from "@/components/QuorumProgress";

export default function RequestDetails() {
  const { id } = useParams();
  const router = useRouter();
  const currentUser = getUser();

  const votingQuery = useAccessRequestsToVote();
  const incomingQuery = useIncomingAccessRequests();
  const voteMutation = useVoteOnAccessRequest();

  const [decision, setDecision] = useState(null);

  if (votingQuery.isLoading || incomingQuery.isLoading) {
    return <Loading text="Loading request audit record..." />;
  }

  if (votingQuery.isError || incomingQuery.isError) {
    return <ErrorState error={votingQuery.error || incomingQuery.error} />;
  }

  // Look up request across both queries
  const allRequests = [
    ...(votingQuery.data || []),
    ...(incomingQuery.data || []),
  ];

  const r = allRequests.find((x) => x.request_id === id);

  if (!r) {
    return (
      <ErrorState
        error={{
          message:
            "This request does not exist, has expired, or is not accessible to your account.",
        }}
      />
    );
  }

  const votes = r.votes || r.Votes || [];
  const approvals = votes.filter((v) => v.decision === "approve").length;
  const owner = r.TrustedContact?.vault_owner;
  const requester = r.TrustedContact?.delegate;
  const threshold = owner?.quorum_threshold ?? 2;

  // Verify roles
  const isOwner = currentUser?.user_id === r.TrustedContact?.owner_id;
  const isRequester = currentUser?.user_id === r.TrustedContact?.contact_id;
  const hasAlreadyVoted = votes.some(
    (v) => v.voter_contact?.contact_id === currentUser?.user_id
  );

  // Can this user cast a vote right now?
  const canVote =
    !isOwner &&
    !isRequester &&
    !hasAlreadyVoted &&
    r.status === "pending";

  return (
    <>
      <PageHeader
        eyebrow="Audit & Decisions"
        title="Emergency Access Request"
        description={
          isOwner
            ? `Reviewing emergency access requested by ${requester?.email || "trusted contact"}`
            : `Reviewing request submitted for ${owner?.email || "vault owner"}'s vault`
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        {/* Left Column: Request Details */}
        <div className="lv-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Reason Provided
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800 leading-relaxed">
                {r.reason}
              </p>
            </div>
            <Badge
              tone={
                r.status === "approved"
                  ? "green"
                  : r.status === "denied" || r.status === "rejected"
                    ? "red"
                    : r.status === "expired"
                      ? "neutral"
                      : "amber"
              }
            >
              {r.status}
            </Badge>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="text-xs font-bold uppercase text-slate-400">
              Request Metadata
            </p>
            <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
              <div>
                <dt className="text-slate-400">Target Vault Owner</dt>
                <dd className="mt-0.5 font-medium text-slate-800">
                  {owner?.email || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Requester</dt>
                <dd className="mt-0.5 font-medium text-slate-800">
                  {requester?.email || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Created</dt>
                <dd className="mt-0.5 font-medium text-slate-800">
                  {new Date(r.created_at).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Voting Window Closes</dt>
                <dd className="mt-0.5 font-medium text-slate-800">
                  {new Date(r.expires_at).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Quorum Engine & Voting History */}
        <div className="lv-card p-6">
          <QuorumProgress
            approvals={approvals}
            threshold={threshold}
            totalContacts={0}
            status={r.status}
          />

          {/* Voting Record Audit Trail */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Consensus Signatures
            </h3>
            <div className="space-y-2">
              {votes.length > 0 ? (
                votes.map((vote) => (
                  <div
                    key={vote.vote_id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <span className="text-xs font-semibold text-slate-700">
                      {vote.voter_contact?.delegate?.email ||
                        vote.TrustedContact?.delegate?.email ||
                        "Authorized Contact"}
                    </span>
                    <Badge tone={vote.decision === "approve" ? "green" : "red"}>
                      {vote.decision}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No votes have been cast yet.
                </p>
              )}
            </div>
          </div>

          {/* Action Area */}
          {canVote ? (
            <div className="mt-6 flex gap-2 border-t border-slate-100 pt-6">
              <Button onClick={() => setDecision("approve")} className="flex-1">
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => setDecision("deny")}
                className="flex-1"
              >
                Deny
              </Button>
            </div>
          ) : isOwner ? (
            <p className="mt-6 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-500 border border-slate-100">
              As the vault owner, you have full audit visibility but cannot vote on requests for your own vault.
            </p>
          ) : hasAlreadyVoted ? (
            <p className="mt-6 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-500 border border-slate-100">
              You have already cast your vote for this request.
            </p>
          ) : null}
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={!!decision}
        title={`${decision === "approve" ? "Approve" : "Deny"} this request?`}
        onClose={() => setDecision(null)}
      >
        <p className="text-xs leading-5 text-slate-600">
          Your vote will be recorded on the tamper-evident audit trail and cannot be changed.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setDecision(null)}>
            Cancel
          </Button>
          <Button
            variant={decision === "deny" ? "danger" : "primary"}
            loading={voteMutation.isPending}
            onClick={async () => {
              try {
                await voteMutation.mutateAsync({ requestId: id, decision });
                setDecision(null);
                router.replace("/access-requests");
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            Confirm {decision === "approve" ? "Approval" : "Denial"}
          </Button>
        </div>
      </Modal>
    </>
  );
}