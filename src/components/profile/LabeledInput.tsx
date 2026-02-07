import React, { useState } from "react";

interface LabeledInputProps {
  type: "text" | "email" | "password";
  label: string;
  placeholder?: string;
  value?: string;
  showToggle?: boolean; // Password only
  readOnly?: boolean; // Profile edition only
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  type = "text",
  label,
  placeholder,
  value,
  showToggle = false,
  readOnly = false,
  error,
  onChange,
}) => {
  const isPasswordToggle = showToggle && type === "password" && !readOnly;
  const [isRevealed, setIsRevealed] = useState(false);

  const baseInput =
    "w-full rounded-xl border bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none";
  const focus = readOnly ? "" : " focus:border-[#2e6f73]";
  const errorBorder = error ? " border-red-500" : " border-gray-200";

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      {/* Password input */}
      {isPasswordToggle ? (
        <div
          className={[
            "flex items-center gap-3 w-full rounded-xl border bg-white px-4 py-3",
            error ? "border-red-500" : "border-gray-200",
            "focus-within:border-[#2e6f73]",
          ].join(" ")}
        >
          <input
            type={isRevealed ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
            className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none"
          />
          <button
            type="button"
            className="text-gray-500 font-semibold active:opacity-70"
            onClick={() => setIsRevealed((prev) => !prev)}
          >
            {isRevealed ? "Hide" : "Show"}
          </button>
        </div>
      ) : (
        // Non-password input
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
          className={
            readOnly
              ? [
                  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 placeholder:text-gray-400 outline-none cursor-default",
                  error ? " border-red-500" : "",
                ].join(" ")
              : [baseInput, errorBorder, focus].join(" ")
          }
        />
      )}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default LabeledInput;
