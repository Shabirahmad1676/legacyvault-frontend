"use client";

export function Button({ children, variant = "primary", className = "", loading = false, ...props }) {
  const styles = {
    // Neon mint green with high-contrast black text (matches "Launch app" button in part1_2.png)
    primary: "bg-[#2EE884] text-black shadow-sm hover:bg-[#25C870] hover:shadow-[0_4px_14px_rgba(46,232,132,0.3)]",
    // Clean white button with gray border
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
    ghost: "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100",
  };
  return (
    <button
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {loading ? "Working…" : children}
    </button>
  );
}

export function Field({ label, error, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputClasses = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#2EE884] focus:ring-4 focus:ring-[#2EE884]/20 shadow-sm";

export function Input(props) {
  return <input className={inputClasses} {...props} />;
}

export function Textarea(props) {
  return <textarea className={`min-h-32 resize-y ${inputClasses}`} {...props} />;
}

export function Select(props) {
  return <select className={inputClasses} {...props} />;
}

export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-slate-200 bg-slate-50 text-slate-600",
    green: "border-[#2EE884]/30 bg-[#2EE884]/10 text-emerald-800",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    red: "border-red-200 bg-red-50 text-red-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${tones[tone] || tones.neutral}`}>
      {tone === 'green' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
      {children}
    </span>
  );
}

export function Loading({ text = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500 rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="h-6 w-6 border-2 border-[#2EE884] border-t-transparent rounded-full animate-[spin_1s_linear_infinite] mb-4" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

export function ErrorState({ error, retry }) {
  return (
    <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
      <p className="font-semibold text-red-800">Unable to load this section.</p>
      <p className="mt-1 text-sm text-red-600">{error?.message || "Please try again."}</p>
      {retry && <Button variant="secondary" className="mt-4 border-red-200 text-red-700 hover:bg-red-100" onClick={retry}>Retry</Button>}
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">{title}</h2>
          <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, description }) {
  return (
    <div className="p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">{value}</p>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </div>
  );
}

export function StatRow({ children }) {
  return (
    <div className="grid rounded-[2rem] border border-slate-200 bg-white divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-5 shadow-sm overflow-hidden">
      {children}
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between relative z-10">
      <div>
        {eyebrow && <p className="text-[10px] font-bold uppercase tracking-widest text-[#25C870] mb-3">{eyebrow}</p>}
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}