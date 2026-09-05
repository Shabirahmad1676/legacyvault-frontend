"use client";

import Link from "next/link";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { AlertCircle, Mail } from "lucide-react";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthButton from "../../components/auth/AuthButton";

import { login } from "../../api/auth";
import { setSession } from "../../lib/auth";
import { loginSchema } from "../../schemas/forms";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthLayout variant="login">
      <div className="rounded-2xl bg-white p-7 shadow-[0_12px_40px_rgba(6,59,45,0.06)] sm:p-9">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#063B2D] text-[#B8F36B]">
            <span className="text-xs font-bold">L</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#0B1F18]">
            Welcome back
          </h1>

          <p className="mt-2 text-xs leading-5 text-[#718078]">
            Access your private vault and trusted legacy network.
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (
            values,
            { setSubmitting, setStatus }
          ) => {
            setStatus("");

            try {
              const response = await login(values);

              setSession(response.data);

              router.replace("/dashboard");
            } catch (error) {
              setStatus(
                error?.message ||
                  "Unable to sign in. Please try again."
              );
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
            status,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <AuthInput
                label="Email address"
                name="email"
                type="email"
                placeholder="name@domain.com"
                icon={Mail}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                autoComplete="email"
              />

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#52625B]">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-medium text-[#087653] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <PasswordInput
                  name="password"
                  label=""
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                />
              </div>

              {status && (
                <div className="flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{status}</span>
                </div>
              )}

              <AuthButton loading={isSubmitting}>
                Sign in
              </AuthButton>

              <p className="pt-2 text-center text-xs text-[#7A8881]">
                New to LegacyVault?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#087653] hover:underline"
                >
                  Create your vault
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
}