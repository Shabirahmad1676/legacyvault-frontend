import { Users } from "lucide-react";

export function EmptyTrustedContacts() {
  return (
    <div className="rounded-2xl border border-dashed border-[#C8D8CF] bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF7E9]">
        <Users className="h-5 w-5 text-[#063B2D]" />
      </div>

      <h3 className="mt-4 font-semibold text-[#0B1F18]">
        No trusted contacts yet
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-[#64706A]">
        Add trusted people who can participate in emergency
        access decisions.
      </p>
    </div>
  );
}