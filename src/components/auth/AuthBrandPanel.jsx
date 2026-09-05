import { Check } from "lucide-react";
import AuthLogo from "./AuthLogo";

const content = {
  login: {
    eyebrow: "Secure access",
    title: "Secured by the people you trust.",
    description:
      "LegacyVault helps you protect important information and prepare for emergency access when it matters most.",
    features: [
      {
        title: "Emergency access requests",
        description: "Requires independent trusted approvals.",
      },
      {
        title: "Trusted contacts",
        description: "Choose who can participate in your recovery plan.",
      },
      {
        title: "Controlled access",
        description: "No single person decides.",
      },
    ],
  },

  signup: {
    eyebrow: "Private legacy planning",
    title: "The responsible way to pass down keys.",
    description:
      "Protect passwords, documents, instructions, and important information while giving trusted people a controlled way to help when needed.",
    features: [
      {
        title: "Private records",
        description: "Keep important information organized in one vault.",
      },
      {
        title: "Trusted contacts",
        description: "Choose the people who can participate in emergency access.",
      },
      {
        title: "Controlled access",
        description: "Access requires independent approvals.",
      },
    ],
  },
};

export default function AuthBrandPanel({ variant }) {
  const data = content[variant];

  return (
    <section className="hidden min-h-screen bg-[#063B2D] text-white lg:flex lg:w-[46%] lg:flex-col lg:justify-between px-10 py-8 xl:px-14 xl:py-10">
      <AuthLogo />

      <div className="max-w-md">
        <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#B8F36B]">
          {data.eyebrow}
        </p>

        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] xl:text-[46px]">
          {data.title}
        </h2>

        <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
          {data.description}
        </p>

        <div className="mt-9 space-y-3">
          {data.features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B8F36B] text-[#063B2D]">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>

              <div>
                <p className="text-xs font-semibold text-white">
                  {feature.title}
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-white/50">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-white/35">
        Private by design · {new Date().getFullYear()}
      </p>
    </section>
  );
}