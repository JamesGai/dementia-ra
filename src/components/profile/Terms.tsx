import React from "react";

const Terms: React.FC = () => {
  return (
    <label className="flex items-start gap-3">
      <input type="checkbox" className="mt-1 h-4 w-4 accent-[#2e6f73]" />
      <span className="text-sm text-gray-700 leading-relaxed">
        I agree to the{" "}
        <span className="font-semibold text-[#2e6f73]">Terms</span> and{" "}
        <span className="font-semibold text-[#2e6f73]">Privacy Policy</span>.
      </span>
    </label>
  );
};

export default Terms;
