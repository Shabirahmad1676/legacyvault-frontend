import { TrustedContactCard } from "./TrustedContactCard";
import { EmptyTrustedContacts } from "./EmptyTrustedContacts";

export function TrustedContactsList({
  contacts = [],
  loading,
  onRemove,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-[#E2EAE5] bg-white p-6">
        Loading trusted contacts...
      </div>
    );
  }

  if (!contacts.length) {
    return <EmptyTrustedContacts />;
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact) => (
        <TrustedContactCard
          key={contact.trust_link_id}
          contact={contact}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}