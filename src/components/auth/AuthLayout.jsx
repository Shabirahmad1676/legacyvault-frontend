import AuthBrandPanel from "./AuthBrandPanel";

export default function AuthLayout({
  variant,
  children,
}) {
  return (
    <main className="min-h-screen bg-[#F4F9F6] lg:flex">
      <AuthBrandPanel variant={variant} />

      <section className="flex min-h-screen flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[430px]">
          {children}
        </div>
      </section>
    </main>
  );
}