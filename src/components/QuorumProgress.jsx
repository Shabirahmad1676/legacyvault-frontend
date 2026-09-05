"use client";

import { Badge } from "./ui";

export function QuorumProgress({
  approvals = 0,
  threshold = 0,
  totalContacts = 0,
  status,
}) {
  const safeThreshold = Math.max(threshold, 1);

  const percent = Math.min(
    100,
    Math.round(
      (approvals / safeThreshold) * 100
    )
  );

  const label =
    status === "approved"
      ? "Access approved"
      : status === "rejected"
        ? "Request rejected"
        : `${approvals} of ${threshold} approvals`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold text-[#0B1F18]">
            Approval threshold
          </p>

          <p className="mt-0.5 text-[8px] text-[#718078]">
            {totalContacts} trusted contact
            {totalContacts === 1 ? "" : "s"} configured
          </p>
        </div>

        <Badge
          tone={
            status === "approved"
              ? "green"
              : status === "rejected"
                ? "red"
                : "amber"
          }
        >
          {label}
        </Badge>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#E7EEE9]">
        <div
          className="h-full rounded-full bg-[#10B981] transition-all duration-500"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="text-[8px] font-medium text-[#718078]">
        {status === "approved"
          ? "The required approval threshold has been reached."
          : status === "rejected"
            ? "The request was not approved."
            : `Waiting for ${Math.max(
                0,
                threshold - approvals
              )} more approval${
                threshold - approvals === 1
                  ? ""
                  : "s"
              }.`}
      </p>
    </div>
  );
}