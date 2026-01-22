import React from "react";

interface TextButtonProps {
  isForgotPassword: boolean;
  onNavigate: (tab: "forgotPassword" | "createAccount") => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  isForgotPassword,
  onNavigate,
}) => {
  return (
    <div className="space-y-2">
      <button
        onClick={() =>
          onNavigate(isForgotPassword ? "forgotPassword" : "createAccount")
        }
        type="button"
        className="text-sm font-semibold text-[#2e6f73] mt-1 active:opacity-70"
      >
        {isForgotPassword ? "Forgot password?" : "Don't have an account?"}
      </button>
    </div>
  );
};

export default TextButton;
