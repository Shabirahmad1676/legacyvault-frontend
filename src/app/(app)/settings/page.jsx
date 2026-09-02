import Link from "next/link";
export default function Settings() {
  return (
    <div className="lv-card p-7">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-2 text-sm text-slate-500">
        Manage emergency access protection.
      </p>
      <Link
        className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
        href="/settings/security"
      >
        Security & Quorum
      </Link>
    </div>
  );
}
