export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  onBlur,
  error,
  touched,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#52625B]"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#82918A]" />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={[
            "w-full rounded-lg border bg-white py-3 text-sm text-[#0B1F18]",
            "placeholder:text-[#A2AEA8]",
            "outline-none transition",
            "focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10",
            Icon ? "pl-10 pr-4" : "px-4",
            touched && error
              ? "border-red-300"
              : "border-[#D8E2DD]",
          ].join(" ")}
        />
      </div>

      {touched && error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}