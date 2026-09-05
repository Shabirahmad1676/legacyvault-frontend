import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLogo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#063B2D] text-[#B8F36B]">
        <Shield className="h-4 w-4" />
      </span>

      <span className="text-sm font-semibold tracking-tight text-[#063B2D]">
        LegacyVault
      </span>
    </Link>
  );
}