"use client";

import Link from "next/link";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, AlertCircle, ArrowRight, CheckCircle2, Mail, Eye, EyeOff } from "lucide-react";
import { login } from "../../api/auth";
import { setSession } from "../../lib/auth";
import { authSchema } from "../../schemas/forms";

// --- Animated Grid Background (Imported from Home Page aesthetic) ---
const AnimatedGridBackground = () => {
  const [activeSquares, setActiveSquares] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSquares = Array.from({ length: 12 }, () => Math.floor(Math.random() * 400));
      setActiveSquares(newSquares);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0 grid" 
        style={{ 
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gridAutoRows: '80px',
          width: '100vw',
          height: '100vh',
        }}
      >
        {Array.from({ length: 400 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ backgroundColor: "rgba(16, 185, 129, 0)" }}
            animate={{
              backgroundColor: activeSquares.includes(i) 
                ? "rgba(16, 185, 129, 0.15)" 
                : "rgba(16, 185, 129, 0)",
              transition: { duration: 2, ease: "easeInOut" }
            }}
            className="border-r border-b border-white/[0.04]"
          />
        ))}
      </div>
      {/* Vignette fade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
    </div>
  );
};

export default function Login() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <main className="relative min-h-screen bg-[#050505] text-zinc-100 selection:bg-emerald-500/30 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Global Backgrounds */}
      <AnimatedGridBackground />
      <div className="absolute left-[-20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen pointer-events-none z-0" />
      <div className="absolute right-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-emerald-400/5 blur-[100px] mix-blend-screen pointer-events-none z-0" />

      {/* ── Left Brand Panel ── */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 hidden lg:flex flex-1 flex-col justify-between p-14 xl:p-16"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-80">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-emerald-400 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <Shield className="h-5 w-5" />
            </span>
            <span className="text-lg font-medium tracking-tight text-white">
              LegacyVault
            </span>
          </Link>

          <motion.div className="mt-24 max-w-sm" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Secure Session Active
            </div>

            <h2 className="mt-8 text-4xl font-medium leading-[1.1] tracking-tight text-white">
              Welcome back. <br />
              <span className="text-zinc-500">
                Your vault is waiting.
              </span>
            </h2>

            {/* Glassmorphic Bento Feature List */}
            <div className="mt-12 space-y-4">
              {[
                { title: "Zero-Knowledge Access", desc: "We never see your credentials. Decentralized verification only." },
                { title: "Emergency Recovery", desc: "Trustee consensus unlocks access when you need it most." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex gap-4 rounded-2xl border border-white/[0.04] bg-[#09090B]/60 p-4 backdrop-blur-md transition-colors hover:bg-[#09090B]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-200">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="relative z-10 pt-6 text-xs text-zinc-600"
        >
          Encrypted session • Automated zero-trust validation
        </motion.div>
      </motion.section>

      {/* ── Right Form Panel ── */}
      <section className="relative z-10 flex flex-1 items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md rounded-[2rem] border border-white/[0.05] bg-white/[0.02] p-8 sm:p-12 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          {/* Mobile Header */}
          <div className="mb-10 lg:hidden flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-emerald-400 backdrop-blur-md">
                <Shield className="h-5 w-5" />
              </span>
            </Link>
          </div>

          <motion.div className="mb-10 text-center lg:text-left" variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              Secure Access
            </span>
            <h1 className="mt-3 text-3xl font-medium tracking-tight text-white">
              Sign in to your vault
            </h1>
            <p className="mt-2.5 text-sm text-zinc-400">
              Enter your credentials to unlock your private space.
            </p>
          </motion.div>

          <div className="space-y-6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={authSchema}
              onSubmit={async (v, { setSubmitting }) => {
                setApiError("");
                try {
                  const r = await login(v);
                  setSession(r.data);
                  router.replace("/dashboard");
                } catch (e) {
                  setApiError(e.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <motion.div variants={itemVariants}>
                    <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      Email address
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        placeholder="name@domain.com"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/[0.08] bg-[#050505]/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.02] focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                    {touched.email && errors.email && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-xs text-red-400">
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                      Master password
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                        placeholder="••••••••••••"
                        className="w-full pl-11 pr-12 py-3 rounded-xl border border-white/[0.08] bg-[#050505]/50 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.02] focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-xs text-red-400">
                        {errors.password}
                      </motion.p>
                    )}
                  </motion.div>

                  {apiError && (
                    <motion.div
                      role="alert"
                      className="flex gap-3 rounded-lg border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-300 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 flex-shrink-0" />
                      <span>{apiError}</span>
                    </motion.div>
                  )}

                  <motion.div className="pt-6" variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 font-semibold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="h-4 w-4 border-2 border-black border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, easing: "linear" }}
                          />
                          <span>Unlocking...</span>
                        </>
                      ) : (
                        <>
                          <span>Unlock Vault</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.div>

                  <motion.p className="pt-6 text-center text-sm text-zinc-500" variants={itemVariants}>
                    No vault yet?{" "}
                    <Link href="/signup" className="font-medium text-zinc-300 transition-colors hover:text-emerald-400">
                      Create one now
                    </Link>
                  </motion.p>
                </motion.form>
              )}
            </Formik>
          </div>

          <motion.div
            className="mt-12 flex items-center justify-center gap-2 text-xs text-zinc-600"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Encrypted zero-knowledge authentication</span>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}