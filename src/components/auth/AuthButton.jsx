import { ArrowRight, Loader2 } from "lucide-react";

export default function AuthButton({
  children,
  loading = false,
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#063B2D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#07503D] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}