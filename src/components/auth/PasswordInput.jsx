"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

export default function PasswordInput({
  label = "Password",
  name = "password",
  value,
  onChange,
  onBlur,
  error,
  touched,
  autoComplete = "current-password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#52625B]"
      >
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#82918A]" />

        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder="••••••••"
          className={[
            "w-full rounded-lg border bg-white py-3 pl-10 pr-11 text-sm text-[#0B1F18]",
            "placeholder:text-[#A2AEA8]",
            "outline-none transition",
            "focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10",
            touched && error
              ? "border-red-300"
              : "border-[#D8E2DD]",
          ].join(" ")}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#82918A] hover:text-[#063B2D]"
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {touched && error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}