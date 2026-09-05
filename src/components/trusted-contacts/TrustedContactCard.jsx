import { Mail, Trash2 } from "lucide-react";

export function TrustedContactCard({
  contact,
  onRemove,
}) {
  const user = contact.contact || contact;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E2EAE5] bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF7E9] font-semibold text-[#063B2D]">
          {(user.username || user.email || "?")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <p className="font-medium text-[#0B1F18]">
            {user.username || user.email}
          </p>

          <div className="mt-1 flex items-center gap-2 text-sm text-[#64706A]">
            <Mail className="h-3.5 w-3.5" />
            {user.email}
          </div>

          {contact.relationship_label && (
            <p className="mt-1 text-xs text-[#64706A]">
              {contact.relationship_label}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => onRemove(contact.trust_link_id)}
        className="rounded-lg p-2 text-[#64706A] transition hover:bg-red-50 hover:text-red-600"
        title="Remove contact"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}