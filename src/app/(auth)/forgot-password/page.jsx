"use client";

import Link from "next/link";
import { Formik } from "formik";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import * as Yup from "yup";
import { forgotPassword } from "@/api/auth";

const schema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Email is required."),
});

export default function ForgotPassword() {
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-emerald-400">
              <Shield className="h-6 w-6" />
            </span>
          </Link>
        </div>

        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl">
          {!success ? (
            <>
              <div className="mb-8">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  Account Recovery
                </span>

                <h1 className="mt-3 text-3xl font-medium">
                  Forgot your password?
                </h1>

                <p className="mt-3 text-sm text-zinc-400">
                  Enter your email and we'll send you a secure password
                  reset link.
                </p>
              </div>

              <Formik
                initialValues={{ email: "" }}
                validationSchema={schema}
                onSubmit={async (
                  values,
                  { setSubmitting }
                ) => {
                  setApiError("");

                  try {
                    await forgotPassword(values.email);
                    setSuccess(true);
                  } catch (error) {
                    setApiError(error.message);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        Email address
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />

                        <input
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="name@domain.com"
                          className="w-full rounded-xl border border-white/[0.08] bg-[#050505]/50 py-3 pl-11 pr-4 text-white outline-none focus:border-emerald-500/50"
                        />
                      </div>

                      {touched.email &&
                        errors.email && (
                          <p className="mt-2 text-xs text-red-400">
                            {errors.email}
                          </p>
                        )}
                    </div>

                    {apiError && (
                      <div className="flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {apiError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-emerald-500 py-3.5 font-semibold text-black disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Sending..."
                        : "Send Reset Link"}
                    </button>

                    <div className="text-center">
                      <Link
                        href="/login"
                        className="text-sm text-zinc-400 hover:text-emerald-400"
                      >
                        Back to sign in
                      </Link>
                    </div>
                  </form>
                )}
              </Formik>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />

              <h1 className="mt-5 text-2xl font-medium">
                Check your email
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                If an account exists for that email, we've sent a
                password reset link.
              </p>

              <Link
                href="/login"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"
              >
                Return to sign in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}