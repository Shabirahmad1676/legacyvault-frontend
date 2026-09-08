"use client";
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
  const owner = r.TrustedContact?.vault_owner?.email,
    delegate = r.TrustedContact?.delegate?.email;
  return (
    <div className="lv-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-bold">
            {incoming ? delegate : owner || "Vault owner"}
          </p>
          <p className="mt-1 text-sm text-slate-600">{r.reason}</p>
        </div>
        <Badge
          tone={
            r.status === "approved"
              ? "green"
              : r.status === "rejected"
                ? "red"
                : r.status === "expired"
                  ? "neutral"
                  : "amber"
          }
        >
          {r.status}
        </Badge>
      </div>
      <div className="mt-4 grid gap-2 text-xs text-slate-500">
        <span>Created: {new Date(r.created_at).toLocaleString()}</span>
        <span>Expires: {new Date(r.expires_at).toLocaleString()}</span>
      </div>
      {!incoming && (
        <Link
          href={`/access-requests/${r.request_id}`}
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Review & Vote
        </Link>
      )}
    </div>
  );
}
export default function AccessRequests() {
  const a = useIncomingAccessRequests(),
    v = useAccessRequestsToVote();
  if (a.isLoading || v.isLoading)
    return <Loading text="Loading emergency access requests…" />;
  if (a.isError) return <ErrorState error={a.error} />;
  if (v.isError) return <ErrorState error={v.error} />;
  return (
    <>
      <PageHeader
        eyebrow="Emergency access"
        title="Access Requests"
        description="Review requests against your vault and decisions waiting for your vote."
        action={
          <Link
            href="/access-requests/new"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
          >
            Request Access
          </Link>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-bold">Incoming</h2>
          {a.data.length ? (
            <div className="space-y-3">
              {a.data.map((r) => (
                <RequestCard key={r.request_id} r={r} incoming />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No incoming emergency requests."
              description="Requests against your vault will appear here."
            />
          )}
        </section>
        <section>
          <h2 className="mb-3 text-lg font-bold">Awaiting your vote</h2>
          {v.data.length ? (
            <div className="space-y-3">
              {v.data.map((r) => (
                <RequestCard key={r.request_id} r={r} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No requests currently require your vote."
              description="You are all caught up."
            />
          )}
        </section>
      </div>
    </>
  );
}
