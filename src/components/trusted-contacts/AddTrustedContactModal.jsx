"use client";

import { useState } from "react";
import { X, UserPlus, Mail, UserRound } from "lucide-react";

export function AddTrustedContactModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    await onSubmit({
      email: email.trim(),
      relationship_label: relationship.trim(),
    });

    setEmail("");
    setRelationship("");
  };

  const handleClose = () => {
    if (loading) return;

    setEmail("");
    setRelationship("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2EAE5] px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF7E9]">
                <UserPlus className="h-4 w-4 text-[#063B2D]" />
              </div>

              <h2 className="text-lg font-semibold text-[#0B1F18]">
                Add Trusted Contact
              </h2>
            </div>

            <p className="mt-2 text-sm text-[#64706A]">
              Add someone you trust to help with emergency access.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#64706A] transition hover:bg-[#F3F6F4] hover:text-[#0B1F18] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#0B1F18]">
              Email address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A8881]" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@example.com"
                required
                disabled={loading}
                className="w-full rounded-xl border border-[#D9E3DD] bg-white py-2.5 pl-10 pr-3 text-sm text-[#0B1F18] outline-none transition placeholder:text-[#9AA59F] focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 disabled:bg-[#F5F7F6]"
              />
            </div>

            <p className="mt-1.5 text-xs text-[#7A8881]">
              The person must already have a LegacyVault account.
            </p>
          </div>

          {/* Relationship */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#0B1F18]">
              Relationship
              <span className="ml-1 font-normal text-[#8A9690]">
                (optional)
              </span>
            </label>

            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A8881]" />

              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Brother, Spouse, Friend"
                disabled={loading}
                className="w-full rounded-xl border border-[#D9E3DD] bg-white py-2.5 pl-10 pr-3 text-sm text-[#0B1F18] outline-none transition placeholder:text-[#9AA59F] focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 disabled:bg-[#F5F7F6]"
              />
            </div>
          </div>

          {/* Info */}
          <div className="rounded-xl bg-[#EEF7E9] p-3.5">
            <p className="text-xs leading-5 text-[#315B4B]">
              Trusted contacts cannot access your vault by themselves.
              Emergency access requires the configured approval threshold.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-[#D9E3DD] px-4 py-2.5 text-sm font-medium text-[#405049] transition hover:bg-[#F5F7F6] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="rounded-xl bg-[#063B2D] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0B4D3C] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}