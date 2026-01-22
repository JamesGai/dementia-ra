import React from "react";

interface ProfilePageProps {
  onNavigate: (tab: "forgotPassword") => void;
}

const Password: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-bold text-gray-900">Password</div>
      <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#2e6f73]">
        <input
          type="password"
          placeholder="Enter password"
          className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none"
        />
        <button
          type="button"
          className="text-gray-500 font-semibold active:opacity-70"
        >
          Show
        </button>
      </div>
      {/* Forgot password button */}
      <button
        onClick={() => onNavigate("forgotPassword")}
        type="button"
        className="text-sm font-semibold text-[#2e6f73] mt-1 active:opacity-70"
      >
        Forgot password?
      </button>
    </div>
  );
};

export default Password;
