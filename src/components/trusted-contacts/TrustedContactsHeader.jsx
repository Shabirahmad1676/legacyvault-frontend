import { UserPlus, ShieldCheck } from "lucide-react";

export function TrustedContactsHeader({ onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />

          <h1 className="text-2xl font-semibold text-[#0B1F18]">
            Trusted Contacts
          </h1>
        </div>

        <p className="mt-1 text-sm text-[#64706A]">
          Manage the people who can help unlock your vault.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl bg-[#063B2D] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0B4D3C]"
      >
        <UserPlus className="h-4 w-4" />
        Add Contact
      </button>
    </div>
  );
}