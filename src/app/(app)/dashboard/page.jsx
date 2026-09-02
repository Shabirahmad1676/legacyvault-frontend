"use client";
import Link from "next/link";
import {
  PageHeader,
  StatRow,
  StatCard,
  Loading,
  ErrorState,
  EmptyState,
  Badge,
} from "../../../components/ui";
import { QuorumProgress } from "../../../components/QuorumProgress";
import {
  useVaultItems,
  useTrustedContacts,
  useIncomingAccessRequests,
  useAccessRequestsToVote,
} from "../../../hooks/useLegacyVault";
import { getUser } from "../../../lib/auth";

export default function Dashboard() {
  const u = getUser();
  const v = useVaultItems(),
    c = useTrustedContacts(),
    incoming = useIncomingAccessRequests(),
    voting = useAccessRequestsToVote();
    
  if ([v, c, incoming, voting].some((x) => x.isLoading))
    return <Loading text="Syncing cryptographic state…" />;
    
  if ([v, c, incoming, voting].some((x) => x.isError))
    return (
      <ErrorState error={v.error || c.error || incoming.error || voting.error} />
    );
    
  const threshold = u?.quorum_threshold ?? 0;
  const pendingIncoming = incoming.data.filter((x) => x.status === "pending").length;
  const pendingVoting = voting.data.length;

  return (
    <>
      <PageHeader
        eyebrow="System Overview"
        title="Command Center"
        description="A clear view of your protected assets, trusted network, and active consensus requests."
        action={
          <Link
            href="/vault/new"
            className="inline-flex items-center justify-center rounded-full bg-[#2EE884] px-7 py-3 text-sm font-bold text-black shadow-md transition-all hover:bg-[#25C870] hover:shadow-[0_4px_14px_rgba(46,232,132,0.4)]"
          >
            Encrypt New Asset
          </Link>
        }
      />
      
      {/* Metrics Row */}
      <StatRow>
        <StatCard label="Vault Assets" value={v.data.length} />
        <StatCard label="Active Nodes" value={c.data.length} description="Trusted Contacts" />
        <StatCard label="Incoming Req." value={pendingIncoming} />
        <StatCard label="Action Req." value={pendingVoting} description="Requests to Vote" />
        <StatCard
          label="Quorum Target"
          value={threshold}
          description="Signatures Needed"
        />
      </StatRow>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Trust Network Card */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Trust Network</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Nodes authorized to participate in emergency consensus.
              </p>
            </div>
            <Link
              href="/trusted-contacts"
              className="text-[10px] font-bold uppercase tracking-widest text-[#25C870] hover:text-[#18A054] transition-colors"
            >
              Manage
            </Link>
          </div>

          {c.data.length ? (
            <div className="mt-6 space-y-3">
              {c.data.slice(0, 4).map((x) => (
                <div
                  key={x.trust_link_id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                >
                  <span className="text-sm font-bold text-slate-900">
                    {x.delegate?.email || x.contact_id}
                  </span>
                  <Badge tone="neutral">{x.relationship_label}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                title="No Network Defined"
                description="Initialize your trusted network to enable emergency access protocols."
              />
            </div>
          )}
        </div>

        {/* Quorum Protection Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="relative z-10">
            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Consensus Mechanics</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Current configuration for your vault's security threshold.
                </p>
              </div>
              <Link
                href="/settings/security"
                className="text-[10px] font-bold uppercase tracking-widest text-[#25C870] hover:text-[#18A054] transition-colors"
              >
                Configure
              </Link>
            </div>
            
            <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <QuorumProgress
                approvals={0}
                threshold={threshold}
                totalContacts={c.data.length}
                status="pending"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}