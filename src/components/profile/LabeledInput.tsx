import React, { useId, useState } from "react";

interface LabeledInputProps {
  id?: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  showToggle?: boolean;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  showToggle = false,
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isPasswordToggle = showToggle && type === "password";
  const [isRevealed, setIsRevealed] = useState(false);
  const inputType = isPasswordToggle
    ? isRevealed
      ? "text"
      : "password"
    : type;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-bold text-gray-900">
        {label}
      </label>
      {isPasswordToggle ? (
        <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#2e6f73]">
          <input
            id={inputId}
            type={inputType}
            placeholder={placeholder}
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
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2e6f73]"
        />
      )}
    </div>
  );
};

export default LabeledInput;
