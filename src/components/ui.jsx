"use client";

export function Button({
  children,
  variant = "primary",
  className = "",
  loading = false,
  ...props
}) {
  const styles = {
    primary:
      "bg-[#063B2D] text-white hover:bg-[#07503D]",
    secondary:
      "border border-[#D9E3DE] bg-white text-[#0B1F18] hover:bg-[#F4F8F5]",
    danger:
      "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
    ghost:
      "bg-transparent text-[#64706A] hover:bg-[#EEF3F0] hover:text-[#0B1F18]",
  };

  return (
    <button
      disabled={loading || props.disabled}
      className={[
        "inline-flex items-center justify-center",
        "rounded-lg px-4 py-2 text-xs font-semibold",
        "transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? "Working..." : children}
    </button>
  );
}

export function Field({
  label,
  error,
  hint,
  children,
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#64706A]">
        {label}
      </label>

      {children}

      {hint && !error && (
        <p className="text-[10px] text-[#7B8982]">
          {hint}
        </p>
      )}

      {error && (
        <p className="text-[10px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses = [
  "w-full rounded-lg border border-[#DCE5E0]",
  "bg-white px-3.5 py-2.5",
  "text-xs text-[#0B1F18]",
  "outline-none transition",
  "placeholder:text-[#A1ADA7]",
  "focus:border-[#10B981]",
  "focus:ring-2 focus:ring-[#10B981]/10",
].join(" ");

export function Input(props) {
  return (
    <input
      className={inputClasses}
      {...props}
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      className={`${inputClasses} min-h-28 resize-y`}
      {...props}
    />
  );
}

export function Select(props) {
  return (
    <select
      className={inputClasses}
      {...props}
    />
  );
}

export function Badge({
  children,
  tone = "neutral",
}) {
  const tones = {
    neutral:
      "border-[#DCE5E0] bg-[#F5F8F6] text-[#64706A]",
    green:
      "border-[#BFE8D3] bg-[#E5F7ED] text-[#087653]",
    amber:
      "border-[#F0D8A7] bg-[#FFF5E2] text-[#98651A]",
    red:
      "border-red-200 bg-red-50 text-red-700",
    blue:
      "border-blue-200 bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border",
        "px-2 py-1 text-[8px] font-semibold",
        tones[tone] || tones.neutral,
      ].join(" ")}
    >
      {tone === "green" && (
        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
      )}

      {children}
    </span>
  );
}

export function Loading({
  text = "Loading...",
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#DCE5E0] border-t-[#063B2D]" />

      <span className="mt-3 text-xs text-[#718078]">
        {text}
      </span>
    </div>
  );
}

export function ErrorState({
  error,
  retry,
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-sm font-semibold text-red-800">
        Unable to load this section.
      </p>

      <p className="mt-1 text-xs text-red-600">
        {error?.message || "Please try again."}
      </p>

      {retry && (
        <Button
          variant="secondary"
          className="mt-4"
          onClick={retry}
        >
          Retry
        </Button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="rounded-2xl border border-[#E1E8E3] bg-white p-8 text-center">
      <p className="text-sm font-semibold text-[#0B1F18]">
        {title}
      </p>

      <p className="mt-1.5 text-xs text-[#718078]">
        {description}
      </p>

      {action && (
        <div className="mt-5 flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}

export function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#063B2D]/20 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl border border-[#E1E8E3] bg-white p-5 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#EDF1EE] pb-3">
          <h2 className="text-sm font-bold text-[#0B1F18]">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#8A9690] hover:bg-[#F2F5F3]"
          >
            ×
          </button>
        </div>

        <div className="mt-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-xl border border-[#E1E8E3] bg-white px-4 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#718078]">
        {label}
      </p>

      <p className="mt-1 text-[18px] font-bold tracking-tight text-[#0B1F18]">
        {value}
      </p>

      {description && (
        <p className="mt-0.5 text-[9px] text-[#718078]">
          {description}
        </p>
      )}
    </div>
  );
}

export function StatRow({
  children,
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 border-b border-[#E1E8E3] pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#087653]">
            {eyebrow}
          </p>
        )}

        <h1 className="text-2xl font-bold tracking-tight text-[#0B1F18]">
          {title}
        </h1>

        {description && (
          <p className="mt-1.5 max-w-2xl text-xs leading-5 text-[#718078]">
            {description}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}