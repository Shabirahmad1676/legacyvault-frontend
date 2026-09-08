"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  KeyRound,
  Lock,
  Menu,
  Shield,
  UserRound,
  Users,
  X,
  Activity,
  Clock3,
  Eye,
} from "lucide-react";
import { useState } from "react";

/* =========================================================
   DATA
========================================================= */

const vaultItems = [
  {
    icon: KeyRound,
    title: "Passwords",
    count: "12 items",
  },
  {
    icon: FileText,
    title: "Documents",
    count: "08 items",
  },
  {
    icon: Shield,
    title: "Instructions",
    count: "05 items",
  },
  {
    icon: Lock,
    title: "Assets",
    count: "03 items",
  },
];

const trustedPeople = [
  {
    name: "Sarah",
    relation: "Sister",
    status: "Approved",
  },
  {
    name: "Ali",
    relation: "Brother",
    status: "Approved",
  },
  {
    name: "David",
    relation: "Friend",
    status: "Pending",
  },
];

const faqItems = [
  {
    question: "What is LegacyVault?",
    answer:
      "LegacyVault is a private digital vault where you can organize important information and define trusted people who can request emergency access.",
  },
  {
    question: "Can one trusted contact unlock my vault?",
    answer:
      "No. Access is controlled by your approval threshold. For example, if your threshold is 2-of-3, at least two eligible trusted contacts must approve the request.",
  },
  {
    question: "What happens when someone requests access?",
    answer:
      "The requester must provide a reason. Eligible trusted contacts can then review the request and independently approve or reject it.",
  },
  {
    question: "Can I see who voted?",
    answer:
      "Yes. LegacyVault provides visibility into the request status and voting activity so the trusted network can understand how a decision was reached.",
  },
  {
    question: "What happens if a request is rejected?",
    answer:
      "A rejected request does not unlock the vault. The requester must submit another valid request if access is needed later.",
  },
  {
    question: "Can I remove a trusted contact?",
    answer:
      "Yes. Vault owners can manage their trusted contacts and remove a relationship when necessary.",
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, dark = false }) {
  return (
    <div
      className={`mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] ${
        dark ? "text-emerald-300" : "text-emerald-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          dark ? "bg-emerald-300" : "bg-emerald-600"
        }`}
      />
      {children}
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-black/[0.08] bg-white/85 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#063B2D] text-white">
                <Shield className="h-4.5 w-4.5" />
              </div>

              <span className="text-[17px] font-bold tracking-tight text-[#0B1F18]">
                LegacyVault
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#how-it-works"
                className="text-sm font-medium text-slate-600 transition hover:text-[#063B2D]"
              >
                How it works
              </a>

              <a
                href="#security"
                className="text-sm font-medium text-slate-600 transition hover:text-[#063B2D]"
              >
                Security
              </a>

              <a
                href="#faq"
                className="text-sm font-medium text-slate-600 transition hover:text-[#063B2D]"
              >
                FAQ
              </a>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="group flex items-center gap-2 rounded-full bg-[#063B2D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#07543f]"
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="border-t border-slate-200 pt-4 md:hidden">
              <nav className="flex flex-col gap-1">
                <a
                  href="#how-it-works"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  How it works
                </a>

                <a
                  href="#security"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Security
                </a>

                <a
                  href="#faq"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  FAQ
                </a>

                <div className="mt-2 flex gap-2">
                  <Link
                    href="/login"
                    className="flex-1 rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold"
                  >
                    Sign in
                  </Link>

                  <Link
                    href="/signup"
                    className="flex-1 rounded-xl bg-[#063B2D] py-3 text-center text-sm font-semibold text-white"
                  >
                    Get started
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   HERO PRODUCT MOCKUP
========================================================= */

function VaultDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.35 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* ambient glow */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-lime-300/30 blur-[100px]" />

      <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_40px_100px_rgba(12,60,45,0.16)]">
        {/* Browser bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </div>

          <div className="hidden rounded-full bg-slate-50 px-4 py-1.5 text-[10px] text-slate-400 sm:block">
            app.legacyvault.local
          </div>

          <div className="h-6 w-16 rounded-full bg-slate-50" />
        </div>

        <div className="grid md:grid-cols-[190px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-slate-100 bg-[#FBFCFA] p-5 md:block">
            <div className="mb-8 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#063B2D] text-white">
                <Shield className="h-3.5 w-3.5" />
              </div>

              <span className="text-xs font-bold text-[#0B1F18]">
                LegacyVault
              </span>
            </div>

            <div className="space-y-1">
              {["Overview", "Vault", "Trusted people", "Requests", "Activity"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={`rounded-xl px-3 py-2.5 text-[11px] font-medium ${
                      index === 0
                        ? "bg-[#EAF5E7] text-[#063B2D]"
                        : "text-slate-400"
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </aside>

          {/* Main */}
          <div className="bg-white p-5 sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Your private vault
                </p>

                <h3 className="mt-2 text-xl font-bold tracking-tight text-[#0B1F18] sm:text-2xl">
                  Good evening, Shabir
                </h3>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5E7]">
                <Lock className="h-4 w-4 text-[#063B2D]" />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {vaultItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-[#FBFCFA] p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#063B2D] shadow-sm">
                      <Icon className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-[#0B1F18]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      {item.count}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Protection card */}
            <div className="mt-4 rounded-2xl bg-[#063B2D] p-5 text-white">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                    Emergency access protection
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    2 of 3 trusted people must approve
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/55">
                    No single trusted contact can unlock your vault alone.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-[#063B2D]">
                    <Check className="h-4 w-4" />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-[#063B2D]">
                    <Check className="h-4 w-4" />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/40">
                    <span className="text-xs">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   QUORUM VISUALIZATION
========================================================= */

function QuorumVisualization() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[32px] bg-[#07100D] px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
      {/* glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_160px_1fr]">
          {/* Trusted people */}
          <div className="space-y-3">
            {trustedPeople.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.07] text-xs font-bold text-white">
                    {person.name[0]}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/35">
                      {person.relation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      person.status === "Approved"
                        ? "bg-emerald-400"
                        : "bg-white/20"
                    }`}
                  />

                  <span
                    className={`text-[9px] font-semibold uppercase tracking-wider ${
                      person.status === "Approved"
                        ? "text-emerald-300"
                        : "text-white/35"
                    }`}
                  >
                    {person.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-emerald-400/25 bg-[#0A1713] shadow-[0_0_70px_rgba(16,185,129,0.12)]">
              <div className="absolute inset-3 rounded-full border border-dashed border-white/10" />

              <Shield className="h-9 w-9 text-emerald-300" />
            </div>

            <div className="mt-5 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                Quorum
              </p>

              <p className="mt-1 text-xl font-bold text-white">2 of 3</p>
            </div>
          </div>

          {/* Result */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="w-full max-w-xs rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-[#063B2D]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Access approved
                  </p>

                  <p className="mt-1 text-[10px] text-emerald-200/60">
                    Required quorum reached
                  </p>
                </div>
              </div>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "66%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-emerald-400"
                />
              </div>

              <div className="mt-2 flex justify-between text-[9px] text-white/35">
                <span>2 approvals</span>
                <span>3 contacts</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-7 text-center">
          <p className="text-sm leading-6 text-white/45">
            Access is not granted by one person's decision.
            <span className="text-white/75">
              {" "}
              Your trusted network decides together.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Secure your information",
      description:
        "Keep passwords, documents, instructions and important assets organized inside your private vault.",
    },
    {
      number: "02",
      title: "Choose trusted people",
      description:
        "Add existing LegacyVault users you trust and define your relationship with each person.",
    },
    {
      number: "03",
      title: "Set your threshold",
      description:
        "Decide how many trusted contacts must agree before emergency access is approved.",
    },
    {
      number: "04",
      title: "A request is submitted",
      description:
        "A trusted contact can request emergency access and explain why the information is needed.",
    },
    {
      number: "05",
      title: "Your network votes",
      description:
        "Eligible trusted contacts independently review the request and approve or reject it.",
    },
    {
      number: "06",
      title: "Access unlocks",
      description:
        "When the required quorum is reached, the request becomes approved and access is granted.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>How it works</SectionLabel>

          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#0B1F18] sm:text-5xl lg:text-6xl">
              A safer path from{" "}
              <span className="text-slate-400">storage</span> to access.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              LegacyVault separates storing sensitive information from
              deciding when someone should be allowed to access it.
            </p>
          </div>
        </FadeUp>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <FadeUp key={step.number} delay={index * 0.05}>
              <div className="h-full bg-[#FBFCFA] p-7 transition hover:bg-white sm:p-8">
                <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-600">
                  {step.number}
                </span>

                <h3 className="mt-8 text-xl font-semibold tracking-tight text-[#0B1F18]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROBLEM SECTION
========================================================= */

function ProblemSection() {
  return (
    <section className="overflow-hidden bg-[#EEF7E9] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <FadeUp>
          <SectionLabel>The problem</SectionLabel>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#0B1F18] sm:text-5xl">
            When you're unavailable, your information shouldn't be.
          </h2>

          <p className="mt-6 text-base leading-7 text-slate-600 sm:text-lg">
            Important information is often scattered across notes, documents,
            paper and memory. And when an emergency happens, simply giving one
            person everything creates another problem: too much access, too
            early.
          </p>

          <Link
            href="/signup"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#063B2D] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#07543f]"
          >
            Protect what matters
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Lock,
                title: "Permanent sharing",
                text: "Sharing everything with one person can give them access they don't actually need.",
              },
              {
                icon: Users,
                title: "Single point of failure",
                text: "One person shouldn't be responsible for deciding when sensitive information is released.",
              },
              {
                icon: Eye,
                title: "No clear process",
                text: "Emergency situations need a clear, understandable way to request and approve access.",
              },
              {
                icon: Activity,
                title: "No audit trail",
                text: "Important decisions should be visible so everyone understands what happened.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#D8E7D2] bg-white/70 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#063B2D] text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <h3 className="mt-6 font-semibold text-[#0B1F18]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* =========================================================
   TRUSTED NETWORK
========================================================= */

function TrustedNetwork() {
  return (
    <section className="bg-white px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <FadeUp>
          <SectionLabel>Your trusted network</SectionLabel>

          <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[#0B1F18] sm:text-5xl">
            The people you trust become part of the safety net.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            Add trusted contacts from your LegacyVault network and define how
            you know them. They don't receive permanent access to your vault.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Trusted contacts can request emergency access.",
              "Each eligible contact can independently vote.",
              "No single contact can satisfy a multi-person quorum.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5F4DF] text-[#063B2D]">
                  <Check className="h-3 w-3" />
                </div>

                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative rounded-[32px] bg-[#F5F8F3] p-6 sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-lime-300/30 blur-[70px]" />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Trusted network
                  </p>

                  <p className="mt-1 text-lg font-semibold text-[#0B1F18]">
                    3 trusted contacts
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <Users className="h-4 w-4 text-[#063B2D]" />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ["Sarah", "Sister"],
                  ["Ali", "Brother"],
                  ["David", "Friend"],
                ].map(([name, relation], index) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5E7] text-sm font-bold text-[#063B2D]">
                        {name[0]}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#0B1F18]">
                          {name}
                        </p>

                        <p className="text-[11px] text-slate-400">
                          {relation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                        Trusted
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#063B2D] p-4 text-white">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-300">
                    Approval threshold
                  </p>
                  <p className="mt-1 text-base font-semibold">2 of 3</p>
                </div>

                <Shield className="h-5 w-5 text-emerald-300" />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* =========================================================
   EMERGENCY REQUEST
========================================================= */

function EmergencyRequest() {
  return (
    <section className="bg-[#F8FAF7] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <FadeUp>
            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.06)] sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Access request
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-[#0B1F18]">
                    Emergency access
                  </h3>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-700">
                  Pending
                </span>
              </div>

              <div className="space-y-5 py-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Requested by
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF5E7] text-xs font-bold text-[#063B2D]">
                      S
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#0B1F18]">
                        Sarah
                      </p>

                      <p className="text-[10px] text-slate-400">
                        Sister · Trusted contact
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Reason
                  </p>

                  <div className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    "I need access to the family insurance documents during
                    this emergency."
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Approval progress
                    </p>

                    <span className="text-xs font-semibold text-[#0B1F18]">
                      1 / 2
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-1/2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  {[
                    ["Ali", "Approved"],
                    ["David", "Pending"],
                    ["Ahmed", "Pending"],
                  ].map(([name, status]) => (
                    <div
                      key={name}
                      className="rounded-xl border border-slate-100 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            status === "Approved"
                              ? "bg-emerald-500"
                              : "bg-slate-200"
                          }`}
                        />

                        <span className="text-xs font-medium text-slate-700">
                          {name}
                        </span>
                      </div>

                      <p className="mt-2 text-[9px] uppercase tracking-wider text-slate-400">
                        {status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <SectionLabel>Emergency access</SectionLabel>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#0B1F18] sm:text-5xl">
              Need access? Explain why.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
              A trusted contact doesn't simply open your vault. They submit a
              request with a reason, and the people you've trusted can review
              that request before access is granted.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <Clock3 className="h-5 w-5 text-[#063B2D]" />
                <p className="mt-4 text-sm font-semibold text-[#0B1F18]">
                  Clear status
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  See whether a request is pending, approved or rejected.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <Eye className="h-5 w-5 text-[#063B2D]" />
                <p className="mt-4 text-sm font-semibold text-[#0B1F18]">
                  Visible decisions
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Understand who has voted and how the request progressed.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECURITY DARK SECTION
========================================================= */

/* =========================================================
   SECURITY DARK SECTION (Web3 Interactive Aesthetic)
========================================================= */

function SecuritySection() {
  const guardians = [
    { name: "Sarah", role: "Wife", status: "Approved" },
    { name: "Adam", role: "Son", status: "Pending" },
    { name: "Michael", role: "Attorney", status: "Approved" },
  ];

  return (
    <section
      id="security"
      className="relative overflow-hidden bg-[#050505] px-6 py-24 text-zinc-100 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main ambient glows */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px] mix-blend-screen" />
        <div className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-emerald-400/5 blur-[120px] mix-blend-screen" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px] mix-blend-screen" />

        {/* Minimalist Tech Grid */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <FadeUp className="max-w-3xl">
          <SectionLabel dark>Security by design</SectionLabel>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            No single person
            <br />
            decides.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            LegacyVault puts a cryptographic trust network between an emergency
            request and your most sensitive information.
          </p>
        </FadeUp>

        {/* ================= SECURITY DIAGRAM ================= */}
        <FadeUp delay={0.2} className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/[0.05] bg-[#09090B]/80 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-10">
          {/* Top status bar */}
          <div className="flex flex-col justify-between gap-4 border-b border-white/[0.05] pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-500">
                Emergency access protocol
              </p>
              <p className="mt-2 text-sm text-zinc-400">Request #LV-20481</p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400">
                Consensus in progress
              </span>
            </div>
          </div>

          {/* Diagram Layout */}
          <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 py-14 lg:flex-row lg:gap-6">
            
            {/* ===== LEFT: GUARDIANS ===== */}
            <div className="relative z-20 flex h-[300px] w-full max-w-[280px] flex-col justify-between gap-4">
              <p className="absolute -top-8 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                Trusted network
              </p>

              {guardians.map((guardian, index) => (
                <motion.div
                  key={guardian.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="relative flex flex-1 items-center gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <Users className="h-4 w-4 text-zinc-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-100">
                      {guardian.name}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {guardian.role}
                    </p>
                  </div>

                  <div className="flex flex-col items-end text-right">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        guardian.status === "Approved"
                          ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                          : "bg-zinc-600"
                      }`}
                    />
                    <p
                      className={`mt-1.5 font-mono text-[9px] uppercase tracking-wider ${
                        guardian.status === "Approved"
                          ? "text-emerald-400"
                          : "text-zinc-500"
                      }`}
                    >
                      {guardian.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ===== CENTER: SVG CONNECTIONS ===== */}
            <div className="relative hidden h-[300px] flex-1 items-center justify-center lg:flex">
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                {/* Node 1 to Vault */}
                <path
                  d="M 0 16 C 50 16, 50 50, 100 50"
                  fill="none"
                  stroke="rgba(16,185,129,0.2)"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Node 2 to Vault */}
                <path
                  d="M 0 50 L 100 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                  strokeDasharray="2,2"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Node 3 to Vault */}
                <path
                  d="M 0 84 C 50 84, 50 50, 100 50"
                  fill="none"
                  stroke="rgba(16,185,129,0.2)"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Animated Data Pulses (Only on Approved paths) */}
                <motion.circle
                  r="1.5"
                  fill="#10B981"
                  animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ offsetPath: "path('M 0 16 C 50 16, 50 50, 100 50')" }}
                />
                <motion.circle
                  r="1.5"
                  fill="#10B981"
                  animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                  style={{ offsetPath: "path('M 0 84 C 50 84, 50 50, 100 50')" }}
                />
              </svg>
            </div>

            {/* ===== RIGHT: VAULT & RESULT ===== */}
            <div className="relative z-30 flex w-full max-w-[280px] flex-col items-center gap-8 lg:max-w-none lg:flex-1 lg:flex-row lg:justify-end">
              
              {/* Central Vault Engine */}
              <div className="relative shrink-0">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-[-30px] rounded-full bg-emerald-500/20 blur-[40px]"
                />
                
                <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-emerald-500/20 bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <div className="absolute inset-2 animate-[spin_15s_linear_infinite] rounded-full border border-dashed border-emerald-500/30" />
                  <Shield className="h-8 w-8 text-emerald-400" />
                  <span className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-emerald-500">
                    Engine
                  </span>
                </div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-zinc-950 px-4 py-1.5 shadow-xl">
                  <span className="font-mono text-[10px] text-zinc-500">
                    QUORUM{" "}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-400">
                    2 OF 3
                  </span>
                </div>
              </div>

              {/* Final Consensus Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="w-full shrink-0 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.03] p-5 text-center shadow-[0_0_40px_rgba(16,185,129,0.08)] backdrop-blur-md lg:w-48"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
                <p className="mt-3 text-sm font-medium text-zinc-100">
                  Consensus Reached
                </p>
                <div className="mt-4 flex items-center justify-center gap-1.5 border-t border-emerald-500/10 pt-4">
                  <span className="font-mono text-xl font-medium text-emerald-400">2</span>
                  <span className="text-zinc-600">/</span>
                  <span className="font-mono text-sm text-zinc-500">3</span>
                  <span className="ml-1 text-[9px] uppercase tracking-widest text-zinc-500">
                    Signed
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Security Strip */}
          <div className="grid gap-4 border-t border-white/[0.05] pt-8 sm:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Private by default",
                text: "Vaults remain strictly encrypted.",
              },
              {
                icon: Users,
                title: "Distributed trust",
                text: "No single contact can act alone.",
              },
              {
                icon: Eye,
                title: "Full auditability",
                text: "Track every request and signature.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-white/[0.02] bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.03]"
              >
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <item.icon className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-200">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ================= SECURITY FEATURES (Bento style) ================= */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Encrypted Storage",
              text: "Keep essential documents organized and completely unreadable to anyone but your designated quorum.",
              icon: Lock,
            },
            {
              title: "Consensus Mechanics",
              text: "Establish fractional approval protocols. Define exactly how many trusted nodes must agree to decrypt.",
              icon: Users,
            },
            {
              title: "Immutable Logging",
              text: "Monitor network requests, active votes, and decryption outcomes through a transparent history log.",
              icon: Eye,
            },
          ].map((item, index) => (
            <FadeUp key={item.title} delay={index * 0.1 + 0.4}>
              <div className="group rounded-3xl border border-white/[0.04] bg-[#09090B]/60 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-300 hover:border-emerald-500/20 hover:bg-[#09090B]/80">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/5 transition-colors group-hover:bg-emerald-500/10">
                  <item.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="mt-6 text-base font-medium text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  {item.text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COMPARISON
========================================================= */

function ComparisonSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 sm:px-8 lg:px-12 lg:py-32">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">

            <SectionLabel>
              A better way to share
            </SectionLabel>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Don't put your entire legacy
              <br />
              in one person's hands.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Traditional sharing gives one person permanent access.
              LegacyVault introduces a trusted network and controlled
              emergency access.
            </p>

          </div>
        </FadeUp>

        {/* Comparison */}

        <div className="mt-16 grid gap-5 lg:grid-cols-2">

          {/* ================= TRADITIONAL ================= */}

          <FadeUp>
            <div className="relative h-full overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 p-8 sm:p-10">

              {/* subtle red glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-red-400/[0.08] blur-[80px]" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Traditional sharing
                    </span>

                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                      One person gets everything
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-200 bg-red-50">
                    <KeyRound className="h-5 w-5 text-red-500" />
                  </div>

                </div>

                {/* Graphic */}

                <div className="relative mt-10 flex h-52 items-center justify-center">

                  {/* Person */}

                  <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-red-200 bg-white shadow-sm">

                    <Users className="h-7 w-7 text-slate-400" />

                    <span className="mt-2 text-[10px] font-medium text-slate-500">
                      One person
                    </span>

                  </div>

                  {/* Connecting lines */}

                  <div className="absolute left-1/2 top-1/2 h-px w-52 -translate-x-1/2 rotate-[25deg] bg-red-200" />

                  <div className="absolute left-1/2 top-1/2 h-px w-52 -translate-x-1/2 rotate-[-25deg] bg-red-200" />

                  {/* Documents */}

                  <div className="absolute right-[8%] top-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <span className="text-[10px] text-slate-500">
                      Passwords
                    </span>
                  </div>

                  <div className="absolute right-[2%] bottom-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <span className="text-[10px] text-slate-500">
                      Documents
                    </span>
                  </div>

                  <div className="absolute left-[4%] top-8 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <span className="text-[10px] text-slate-500">
                      Instructions
                    </span>
                  </div>

                </div>

                {/* Problems */}

                <div className="mt-8 space-y-3">

                  {[
                    "Permanent access",
                    "Single point of failure",
                    "No approval process",
                    "Difficult to revoke safely",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500">
                        ×
                      </div>

                      <span className="text-sm text-slate-600">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </FadeUp>

          {/* ================= LEGACYVAULT ================= */}

          <FadeUp delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[32px] border border-emerald-500/20 bg-[#07100D] p-8 text-white shadow-[0_30px_100px_rgba(16,185,129,.08)] sm:p-10">

              {/* Glow */}

              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/[0.12] blur-[100px]" />

              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-500/[0.08] blur-[100px]" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div>

                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                      LegacyVault
                    </span>

                    <h3 className="mt-3 text-2xl font-semibold">
                      Access requires consensus
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08]">
                    <Shield className="h-5 w-5 text-emerald-400" />
                  </div>

                </div>

                {/* Graphic */}

                <div className="relative mt-10 flex h-52 items-center justify-center">

                  {/* Connecting network */}

                  <div className="absolute inset-x-10 top-1/2 h-px bg-emerald-500/20" />

                  {/* Guardian 1 */}

                  <div className="absolute left-[5%] top-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.06]">
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>

                  {/* Guardian 2 */}

                  <div className="absolute left-[5%] bottom-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.06]">
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>

                  {/* Guardian 3 */}

                  <div className="absolute left-[28%] top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Users className="h-5 w-5 text-white/40" />
                  </div>

                  {/* Vault */}

                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(16,185,129,0)",
                        "0 0 35px rgba(16,185,129,.25)",
                        "0 0 0 rgba(16,185,129,0)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="absolute right-[8%] flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-500/30 bg-[#07100D]"
                  >
                    <Lock className="h-7 w-7 text-emerald-400" />
                  </motion.div>

                  {/* Approved badge */}

                  <div className="absolute bottom-0 right-[5%] rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-emerald-400">
                      2 of 3 approved
                    </span>
                  </div>

                </div>

                {/* Benefits */}

                <div className="mt-8 space-y-3">

                  {[
                    "No permanent access",
                    "Multiple trusted contacts",
                    "Quorum-based approval",
                    "Transparent request history",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />

                      <span className="text-sm text-white/70">
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
/* =========================================================
   ACTIVITY SECTION
========================================================= */

function ActivitySection() {
  const events = [
    {
      title: "Emergency request submitted",
      person: "Sarah requested access",
      time: "10:42 AM",
      icon: UserRound,
    },
    {
      title: "Request approved",
      person: "Ali approved the request",
      time: "11:08 AM",
      icon: CheckCircle2,
    },
    {
      title: "Request approved",
      person: "David approved the request",
      time: "11:16 AM",
      icon: CheckCircle2,
    },
    {
      title: "Quorum reached",
      person: "2 of 3 approvals received",
      time: "11:16 AM",
      icon: Shield,
    },
  ];

  return (
    <section className="bg-[#EEF7E9] px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <FadeUp>
          <SectionLabel>Activity history</SectionLabel>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#0B1F18] sm:text-5xl">
            Know what happened, and when.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            Important decisions shouldn't disappear into a notification. Keep
            a chronological record of access requests, approvals and outcomes.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="rounded-[32px] border border-[#D8E7D2] bg-white p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Recent activity
                </p>
                <p className="mt-1 text-lg font-semibold text-[#0B1F18]">
                  Emergency access
                </p>
              </div>

              <Activity className="h-5 w-5 text-[#063B2D]" />
            </div>

            <div className="relative">
              <div className="absolute bottom-5 left-[15px] top-5 w-px bg-slate-200" />

              <div className="space-y-6">
                {events.map((event, index) => {
                  const Icon = event.icon;

                  return (
                    <div key={event.title} className="relative flex gap-4">
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                        <Icon className="h-3.5 w-3.5 text-[#063B2D]" />
                      </div>

                      <div className="flex-1 pb-1">
                        <div className="flex flex-col justify-between gap-1 sm:flex-row">
                          <p className="text-sm font-semibold text-[#0B1F18]">
                            {event.title}
                          </p>

                          <span className="text-[10px] text-slate-400">
                            {event.time}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {event.person}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
========================================================= */

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="bg-white px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <FadeUp className="text-center">
          <SectionLabel>FAQ</SectionLabel>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#0B1F18] sm:text-5xl">
            Questions, answered.
          </h2>
        </FadeUp>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen
                    ? "border-[#CFE1C9] bg-[#FBFCFA]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
                >
                  <span className="text-sm font-semibold text-black">
                    {item.question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="max-w-3xl text-sm leading-6 text-slate-500">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="px-6 py-8 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#063B2D] px-6 py-20 text-center sm:px-12 lg:py-28">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-lime-300/20 blur-[100px]" />

        <FadeUp className="relative z-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-emerald-300">
            <Shield className="h-6 w-6" />
          </div>

          <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Leave a safer digital legacy.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/50 sm:text-lg">
            Keep what matters protected today, and make sure the right people
            can access it when they need it.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#063B2D] transition hover:bg-emerald-50"
            >
              Create your vault
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
            >
              Sign in
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer className="bg-white px-6 pb-8 pt-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-slate-200 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#063B2D] text-white">
                <Shield className="h-4 w-4" />
              </div>

              <span className="font-bold tracking-tight text-[#0B1F18]">
                LegacyVault
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
              A private digital vault with emergency access controlled by the
              people you trust.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Product
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="#how-it-works"
                className="block text-sm text-slate-500 hover:text-[#063B2D]"
              >
                How it works
              </a>

              <a
                href="#security"
                className="block text-sm text-slate-500 hover:text-[#063B2D]"
              >
                Security
              </a>

              <a
                href="#faq"
                className="block text-sm text-slate-500 hover:text-[#063B2D]"
              >
                FAQ
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Account
            </p>

            <div className="mt-5 space-y-3">
              <Link
                href="/login"
                className="block text-sm text-slate-500 hover:text-[#063B2D]"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="block text-sm text-slate-500 hover:text-[#063B2D]"
              >
                Create account
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Legal
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="#"
                className="block text-sm text-slate-500 hover:text-[#063B2D]"
              >
                Privacy
              </a>

              <a
                href="#"
                className="block text-sm text-slate-500 hover:text-[#063B2D]"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 py-7 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} LegacyVault. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Built for safer digital legacies
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAF7] font-sans text-[#0B1F18]">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-28 lg:pt-48">
        {/* large ambient gradients */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-lime-300/30 blur-[130px]" />

        <div className="pointer-events-none absolute -right-40 top-10 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#CFE1C9] bg-white/70 px-4 py-2 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#063B2D]">
                  Digital legacy & emergency access
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#0B1F18] sm:text-6xl lg:text-[82px]">
                Your legacy, under trusted{" "}
                <span className="text-slate-400">control.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Keep your important information in one private vault and give
                trusted people a safe way to access it when it matters most.
              </p>
            </FadeUp>

            <FadeUp delay={0.24}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="group flex items-center gap-2 rounded-full bg-[#063B2D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(6,59,45,0.18)] transition hover:-translate-y-0.5 hover:bg-[#07543f]"
                >
                  Create your vault
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="#how-it-works"
                  className="rounded-full border border-slate-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#0B1F18] transition hover:bg-white"
                >
                  See how it works
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Product preview */}
          <div className="mt-16 sm:mt-20">
            <VaultDashboard />
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST STATEMENT
      ===================================================== */}
      <section className="border-y border-slate-200 bg-white px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-center text-xs font-medium text-slate-400 sm:text-left">
            Built around a simple principle:
          </p>

          <p className="text-center text-sm font-semibold text-[#063B2D] sm:text-right">
            Your trusted network should decide together.
          </p>
        </div>
      </section>

      {/* =====================================================
          PROBLEM
      ===================================================== */}
      <ProblemSection />

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <HowItWorks />

      {/* =====================================================
          TRUSTED NETWORK
      ===================================================== */}
      <TrustedNetwork />

      {/* =====================================================
          EMERGENCY REQUEST
      ===================================================== */}
      <EmergencyRequest />

      {/* =====================================================
          SECURITY
      ===================================================== */}
      <SecuritySection />

      {/* =====================================================
          COMPARISON
      ===================================================== */}
      <ComparisonSection />

      {/* =====================================================
          ACTIVITY
      ===================================================== */}
      <ActivitySection />

      {/* =====================================================
          FAQ
      ===================================================== */}
      <FAQ />

      {/* =====================================================
          CTA
      ===================================================== */}
      <FinalCTA />

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />
    </main>
  );
}