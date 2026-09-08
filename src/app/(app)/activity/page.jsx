"use client";
import {
  PageHeader,
  Loading,
  ErrorState,
  EmptyState,
} from "@/components/ui";
import { useActivityLogs } from "@/hooks/useLegacyVault";
export default function Activity() {
  const q = useActivityLogs();
  if (q.isLoading) return <Loading text="Loading activity…" />;
  if (q.isError) return <ErrorState error={q.error} retry={q.refetch} />;
  return (
    <>
      <PageHeader
        eyebrow="Audit trail"
        title="Activity"
        description="A chronological record of events associated with your vault."
      />
      {q.data.length === 0 ? (
        <EmptyState
          title="No activity yet."
          description="Vault and emergency-access events will appear here."
        />
      ) : (
        <div className="lv-card p-6">
          <div className="space-y-6">
            {q.data.map((x) => (
              <div
                key={x.log_id}
                className="relative border-l border-slate-200 pl-6"
              >
                <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-slate-900" />
                <p className="text-sm font-semibold text-slate-800">
                  {x.event_description}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {new Date(x.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
