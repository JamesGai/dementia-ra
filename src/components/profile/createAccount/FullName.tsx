import React from "react";

const FullName: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-bold text-gray-900">Full name</div>
      <input
        type="text"
        placeholder="Enter your full name"
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2e6f73]"
      />
    </div>
  );
};

export default FullName;
