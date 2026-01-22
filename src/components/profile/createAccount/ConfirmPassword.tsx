import React from "react";

const ConfirmPassword: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-bold text-gray-900">Confirm password</div>
      <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#2e6f73]">
        <input
          type="password"
          placeholder="Re-enter password"
          className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none"
        />
        <button
          type="button"
          className="text-gray-500 font-semibold active:opacity-70"
        >
          Show
        </button>
      </div>
    </div>
  );
};

export default ConfirmPassword;
