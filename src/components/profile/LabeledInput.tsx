import React, { useState } from "react";

interface LabeledInputProps {
  type: "text" | "email" | "password";
  label: string;
  placeholder?: string;
  value?: string;
  showToggle?: boolean; // Password only
  readOnly?: boolean;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  type = "text",
  label,
  placeholder,
  value,
  showToggle = false,
  readOnly = false,
}) => {
  const isPasswordToggle = showToggle && type === "password" && !readOnly;
  const [isRevealed, setIsRevealed] = useState(false);
  const inputClassName = readOnly
    ? "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 placeholder:text-gray-400 outline-none cursor-default"
    : "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2e6f73]";
  const inputValueProps = value !== undefined ? { value } : {};

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      {isPasswordToggle ? (
        <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#2e6f73]">
          <input
            type={type}
            placeholder={placeholder}
            readOnly={readOnly}
            {...inputValueProps}
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
        <input
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          {...inputValueProps}
          className={inputClassName}
        />
      )}
    </div>
  );
};

export default LabeledInput;
