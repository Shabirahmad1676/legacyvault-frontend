"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  FolderLock,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  Users,
  X,
  ArrowRightLeft,
} from "lucide-react";

import { clearSession, getUser } from "../lib/auth";

const nav = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/vault",
    label: "My Vault",
    icon: FolderLock,
  },
  {
    href: "/trusted-contacts",
    label: "Trusted Contacts",
    icon: Users,
  },
  {
    href: "/access-requests",
    label: "Access Requests",
    icon: ArrowRightLeft,
  },
  {
    href: "/shared-vaults",
    label: "Shared Vaults",
    icon: Shield,
  },
  {
    href: "/activity",
    label: "Activity",
    icon: Activity,
  },
  {
    href: "/settings/security",
    label: "Settings",
    icon: Settings,
  },
];

export function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const currentUser = getUser();

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    setUser(currentUser);
  }, [router]);

  const signOut = () => {
    clearSession();
    router.replace("/login");
  };

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F8FAF7] text-sm text-[#64706A]">
        Loading your vault...
      </div>
    );
  }

  const displayName =
    user.username ||
    user.name ||
    user.email?.split("@")[0] ||
    "there";

  const initials = displayName
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#0B1F18]">
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-[#063B2D]/20 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 w-[184px]",
          "bg-[#063B2D] text-white",
          "transition-transform duration-200",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-full flex-col px-3 py-4">
          {/* Logo */}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="mb-7 flex items-center gap-2.5 px-2"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#071F18] text-[#B8F36B]">
              <Shield className="h-3.5 w-3.5" />
            </span>

            <span className="text-[13px] font-semibold tracking-tight">
              LegacyVault
            </span>
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 rounded-md p-1 text-white/50 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Navigation */}
          <nav
            className="flex-1 space-y-1"
            aria-label="Primary navigation"
          >
            {nav.map(({ href, label, icon: Icon }) => {
              const isActive =
                pathname === href ||
                pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2",
                    "text-[12px] font-medium transition-colors",
                    isActive
                      ? "bg-[#145442] text-white"
                      : "text-white/60 hover:bg-white/[0.06] hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="border-t border-white/10 pt-4">
            <div className="mb-3 flex items-center gap-2.5 px-1">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D8C4A8] text-[9px] font-bold text-[#063B2D]">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold text-white">
                  {displayName}
                </p>

                <p className="truncate text-[8px] text-white/40">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-2 px-1 text-[9px] font-medium text-white/50 hover:text-white"
            >
              <LogOut className="h-3 w-3" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="min-h-screen lg:pl-[184px]">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-[#E5EBE7] bg-[#F8FAF7] px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-[#DDE6E1] bg-white p-2 text-[#063B2D] lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-[9px] text-[#64706A] sm:block">
              Private vault
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#063B2D] text-[9px] font-semibold text-white">
              {initials}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1180px] px-4 py-5 sm:px-6 lg:px-7 lg:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}