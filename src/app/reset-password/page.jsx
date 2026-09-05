"use client";

import Link from "next/link";
import { Formik } from "formik";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { resetPassword } from "../../api/auth";

const schema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required."),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Passwords do not match."
    )
    .required("Please confirm your password."),
});

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    return (
      <main className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />

          <h1 className="mt-5 text-2xl font-medium">
            Invalid reset link
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            This password reset link is missing its token.
          </p>

          <Link
            href="/forgot-password"
            className="mt-6 inline-block text-emerald-400"
          >
            Request a new link
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 text-emerald-400">
            <Shield className="h-6 w-6" />
          </span>
        </div>

        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
          {success ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />

              <h1 className="mt-5 text-2xl font-medium">
                Password reset
              </h1>

              <p className="mt-3 text-sm text-zinc-400">
                Your password has been changed successfully.
              </p>

              <Link
                href="/login"
                className="mt-7 inline-block rounded-full bg-emerald-500 px-6 py-3 font-semibold text-black"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-medium">
                Create new password
              </h1>

              <p className="mt-3 text-sm text-zinc-400">
                Choose a new password for your LegacyVault account.
              </p>

              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={schema}
                onSubmit={async (
                  values,
                  { setSubmitting }
                ) => {
                  setApiError("");

                  try {
                    await resetPassword(
                      token,
                      values.password
                    );

                    setSuccess(true);

                    setTimeout(() => {
                      router.replace("/login");
                    }, 1500);
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
                    className="mt-8 space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        New password
                      </label>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />

                        <input
                          name="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-white/[0.08] bg-[#050505]/50 py-3 pl-11 pr-12 text-white outline-none focus:border-emerald-500/50"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {touched.password &&
                        errors.password && (
                          <p className="mt-2 text-xs text-red-400">
                            {errors.password}
                          </p>
                        )}
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                        Confirm password
                      </label>

                      <input
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-white/[0.08] bg-[#050505]/50 py-3 px-4 text-white outline-none focus:border-emerald-500/50"
                      />

                      {touched.confirmPassword &&
                        errors.confirmPassword && (
                          <p className="mt-2 text-xs text-red-400">
                            {errors.confirmPassword}
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
                        ? "Resetting..."
                        : "Reset Password"}
                    </button>
                  </form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </main>
  );
}