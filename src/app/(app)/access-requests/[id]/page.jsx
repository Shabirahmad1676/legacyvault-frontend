"use client";
import { useParams, useRouter } from "next/navigation";
import {
  useAccessRequestsToVote,
  useVoteOnAccessRequest,
} from "../../../../hooks/useLegacyVault";
import {
  PageHeader,
  Button,
  Loading,
  ErrorState,
  Badge,
  Modal,
} from "../../../../components/ui";
import { QuorumProgress } from "../../../../components/QuorumProgress";
import { useState } from "react";
export default function RequestDetails() {
  const { id } = useParams(),
    router = useRouter(),
    q = useAccessRequestsToVote(),
    m = useVoteOnAccessRequest(),
    [decision, setDecision] = useState(null);
  if (q.isLoading) return <Loading />;
  if (q.isError) return <ErrorState error={q.error} />;
  const r = q.data.find((x) => x.request_id === id);
  if (!r)
    return (
      <ErrorState
        error={{
          message:
            "This request is no longer pending or is not available to your account.",
        }}
      />
    );
  const votes = r.Votes || [];
  const approvals = votes.filter((v) => v.decision === "approve").length;
  const owner = r.TrustedContact?.vault_owner;
  const threshold = owner?.quorum_threshold ?? 0;
  return (
    <>
      <PageHeader
        eyebrow="Review request"
        title="Emergency access decision"
        description={
          owner?.email
            ? `Request for ${owner.email}`
            : "Review the request details returned by the backend."
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="lv-card p-6">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-400">
                Reason
              </p>
              <p className="mt-2 whitespace-pre-wrap text-slate-700">
                {r.reason}
              </p>
            </div>
            <Badge tone="amber">{r.status}</Badge>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="text-xs font-bold uppercase text-slate-400">
              Request
            </p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Created</dt>
                <dd>{new Date(r.created_at).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Expires</dt>
                <dd>{new Date(r.expires_at).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>
       <div className="lv-card p-6">
  <QuorumProgress
  approvals={approvals}
  threshold={threshold}
  totalContacts={0}
  status={r.status}
/>
  
  {/* New Vote Visibility Section */}
  <div className="mt-8 border-t border-slate-100 pt-6">
    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
      Voting Record
    </h3>
    <div className="space-y-3">
      {r.Votes?.length > 0 ? (
        r.Votes.map((vote) => (
          <div key={vote.vote_id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
            <span className="text-sm font-semibold text-slate-700">
              {vote.TrustedContact?.delegate?.email}
            </span>
            <Badge tone={vote.decision === "approve" ? "green" : "red"}>
              {vote.decision}
            </Badge>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-500 italic">No votes have been cast yet.</p>
      )}
    </div>
  </div>

  {/* Only show voting buttons if the request is still pending */}
  {r.status === "pending" && (
    <div className="mt-6 flex gap-2">
      <Button onClick={() => setDecision("approve")}>Approve</Button>
      <Button variant="danger" onClick={() => setDecision("deny")}>
        Deny
      </Button>
    </div>
  )}
</div>
      </div>
      <Modal
        open={!!decision}
        title={`${decision === "approve" ? "Approve" : "Deny"} this request?`}
        onClose={() => setDecision(null)}
      >
        <p className="text-sm text-slate-600">
          Your vote contributes to the quorum decision.
        </p>
        <div className="mt-5 flex gap-2">
          <Button variant="secondary" onClick={() => setDecision(null)}>
            Cancel
          </Button>
          <Button
            variant={decision === "deny" ? "danger" : "primary"}
            loading={m.isPending}
            onClick={async () => {
              try {
                await m.mutateAsync({ requestId: id, decision });
                setDecision(null);
                router.replace("/access-requests");
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            {decision === "approve" ? "Approve" : "Deny"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
