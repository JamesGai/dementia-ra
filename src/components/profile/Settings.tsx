import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
      <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
        Settings
      </div>
      <button
        type="button"
        className="w-full text-left bg-white rounded-2xl shadow-md active:opacity-90"
      >
        <div className="px-6 py-5 space-y-1">
          <div className="text-gray-900 font-bold">TBD</div>
          <p className="text-gray-700 leading-relaxed">TBD</p>
        </div>
      </button>
    </div>
  );
};

export default Settings;
