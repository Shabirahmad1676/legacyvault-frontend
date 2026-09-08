"use client";

import Link from "next/link";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Mail,
  User,
} from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";

import { signup } from "@/api/auth";
import { setSession } from "@/lib/auth";
import { signupSchema } from "@/schemas/forms";

export default function SignupPage() {
  const router = useRouter();

  return (
    <AuthLayout variant="signup">
      <div className="rounded-2xl bg-white p-7 shadow-[0_12px_40px_rgba(6,59,45,0.06)] sm:p-9">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#063B2D] text-[#B8F36B]">
            <span className="text-xs font-bold">L</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#0B1F18]">
            Create your LegacyVault
          </h1>

          <p className="mt-2 text-xs leading-5 text-[#718078]">
            Protect your information and establish your trusted network.
          </p>
        </div>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={async (
            values,
            { setSubmitting, setStatus }
          ) => {
            setStatus("");

            try {
              const response = await signup(values);

              setSession(response.data);

              router.replace("/dashboard");
            } catch (error) {
              setStatus(
                error?.message ||
                  "Unable to create your account. Please try again."
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
              className="space-y-4"
            >
              <AuthInput
                label="Username"
                name="username"
                placeholder="shabir"
                icon={User}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username}
                touched={touched.username}
                autoComplete="username"
              />

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

              <PasswordInput
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                autoComplete="new-password"
              />


              {status && (
                <div className="flex gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{status}</span>
                </div>
              )}

              <div className="pt-2">
                <AuthButton loading={isSubmitting}>
                  Create account
                </AuthButton>
              </div>

              <p className="pt-2 text-center text-xs text-[#7A8881]">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#087653] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
}