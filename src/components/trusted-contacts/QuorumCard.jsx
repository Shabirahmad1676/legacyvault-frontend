"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Minus, Plus } from "lucide-react";

export function QuorumCard({
  threshold = 1,
  contactsCount = 0,
  onUpdate,
  loading = false,
}) {
  const [value, setValue] = useState(threshold);

  useEffect(() => {
    setValue(threshold);
  }, [threshold]);

  const max = Math.max(contactsCount, 1);

  const decrease = () => {
    setValue((current) => Math.max(1, current - 1));
  };

  const increase = () => {
    setValue((current) => Math.min(max, current + 1));
  };

  const handleSave = () => {
    if (value === threshold) return;

    onUpdate(value);
  };

  return (
    <section className="rounded-2xl border border-[#E2EAE5] bg-white">
      <div className="flex items-start gap-4 p-6">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF7E9]">
          <ShieldCheck className="h-5 w-5 text-[#063B2D]" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-[#0B1F18]">
            Emergency Access Approval
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#64706A]">
            Choose how many trusted contacts must approve an emergency
            access request before your vault becomes available.
          </p>
        </div>
      </div>

      <div className="border-t border-[#E2EAE5] px-6 py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Counter */}
          <div>
            <p className="text-sm font-medium text-[#0B1F18]">
              Required approvals
            </p>

            <p className="mt-1 text-xs text-[#7A8881]">
              {contactsCount === 0
                ? "Add trusted contacts first."
                : `${value} of ${contactsCount} trusted contacts`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decrease}
              disabled={loading || value <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E3DD] text-[#405049] transition hover:bg-[#F5F7F6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>

            <div className="flex min-w-[100px] items-center justify-center rounded-xl border border-[#D9E3DD] px-5 py-2">
              <span className="text-lg font-semibold text-[#063B2D]">
                {value}
              </span>

              <span className="mx-1 text-[#9AA59F]">
                of
              </span>

              <span className="text-sm text-[#64706A]">
                {contactsCount}
              </span>
            </div>

            <button
              type="button"
              onClick={increase}
              disabled={
                loading ||
                contactsCount === 0 ||
                value >= max
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E3DD] text-[#405049] transition hover:bg-[#F5F7F6] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-5 rounded-xl bg-[#F8FAF7] px-4 py-3">
          <p className="text-xs leading-5 text-[#64706A]">
            {contactsCount === 0 ? (
              "Add trusted contacts to configure your approval threshold."
            ) : (
              <>
                <span className="font-medium text-[#0B1F18]">
                  {value}-of-{contactsCount}
                </span>{" "}
                approval is required to unlock emergency access.
                No single trusted contact can unlock the vault alone.
              </>
            )}
          </p>
        </div>

        {/* Save */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={
              loading ||
              value === threshold ||
              contactsCount === 0
            }
            className="rounded-xl bg-[#063B2D] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0B4D3C] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Approval Rule"}
          </button>
        </div>
      </div>
    </section>
  );
}