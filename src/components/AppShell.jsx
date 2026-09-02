"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getUser } from "../lib/auth";
import { useEffect, useState } from "react";
import { Button } from "../components/ui";
import { Shield } from "lucide-react"; 

const nav = [
  ["/dashboard", "Dashboard"],
  ["/vault", "My Vault"],
  ["/trusted-contacts", "Trusted Contacts"],
  ["/access-requests", "Access Requests"],
  ["/activity", "Activity"],
  ["/settings/security", "Settings"],
];

// Reusable Light Grid Background
const LightGridBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Subtle light-gray grid like in part1_2.png */}
    <div 
      className="absolute inset-0 opacity-50"
      style={{
        backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }}
    />
    {/* Large ambient mint green blobs */}
    <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-[#2EE884]/15 blur-[120px]" />
    <div className="absolute right-[5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-emerald-300/10 blur-[100px]" />
  </div>
);

export function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) router.replace("/login");
    else setUser(u);
  }, [router]);

  const signOut = () => {
    clearSession();
    router.replace("/login");
  };

  if (!user)
    return (
      <div className="min-h-screen bg-[#FAFAFA] grid place-items-center text-sm font-medium text-slate-500">
        Initializing Secure Session…
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-[#2EE884]/30">
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <Link href="/dashboard" className="flex items-center gap-3 mb-10 px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-[#2EE884] shadow-md">
              <Shield className="h-4 w-4" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">LegacyVault</span>
          </Link>

          <nav className="space-y-2 flex-1" aria-label="Primary">
            {nav.map(([href, label]) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive 
                      ? "bg-[#2EE884]/10 text-emerald-800" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto border-t border-slate-100 pt-5">
            <p className="truncate px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{user.email}</p>
            <Button variant="secondary" className="w-full justify-start border-slate-200 shadow-none" onClick={signOut}>
              Terminate Session
            </Button>
          </div>
        </div>
      </aside>

      {open && (
        <button
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        />
      )}

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative">
        <LightGridBackground />

        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/50 bg-white/60 px-4 backdrop-blur-xl lg:px-10">
          <button
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 lg:hidden hover:bg-slate-50 shadow-sm"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            Menu
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900">Active Session</span>
              <span className="text-[10px] font-bold text-[#25C870] tracking-widest uppercase">Verified Node</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-md">
              {user.email?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 relative z-10 mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}