"use client";
import { Badge } from "./ui";

export function QuorumProgress({ approvals=0, threshold=0, totalContacts=0, status }) {
  const denominator = Math.max(totalContacts, threshold, 1);
  const percent = Math.min(100, Math.round((approvals / Math.max(threshold, 1)) * 100));
  const label = status === "approved" ? "Access Approved" : status === "rejected" ? "Request Rejected" : `${approvals} of ${threshold} approvals`;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-900">Consensus Status</span>
        <Badge tone={status === "approved" ? "green" : status === "rejected" ? "red" : "amber"}>{label}</Badge>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100 border border-slate-200 inset-shadow-sm">
        <div 
          className="h-full rounded-full bg-[#2EE884] shadow-[0_0_10px_rgba(46,232,132,0.8)] transition-all duration-1000" 
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 font-medium">
        {status === "approved" 
          ? "The required approval threshold has been reached." 
          : status === "rejected" 
          ? "The request was not approved." 
          : `Waiting for ${Math.max(0, threshold - approvals)} more approval${threshold - approvals === 1 ? "" : "s"}. ${totalContacts} trusted contact${totalContacts === 1 ? "" : "s"} in network.`}
      </p>
    </div>
  );
}