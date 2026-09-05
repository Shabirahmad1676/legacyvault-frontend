export function TrustedContactsStats({
  contacts = [],
  quorumThreshold = 0,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Stat
        label="Trusted Contacts"
        value={contacts.length}
      />

      <Stat
        label="Required Approvals"
        value={quorumThreshold}
      />

      <Stat
        label="Available Approvers"
        value={Math.max(contacts.length - 1, 0)}
      />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#E2EAE5] bg-white p-5">
      <p className="text-sm text-[#64706A]">{label}</p>

      <p className="mt-2 text-2xl font-semibold text-[#0B1F18]">
        {value}
      </p>
    </div>
  );
}