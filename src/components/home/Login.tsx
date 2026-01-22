import React from "react";
import Button from "../universe/Button";

interface LoginProps {
  onNavigate: (tab: "profile") => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
      <div className="flex items-center justify-between gap-4">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div className="inline-block whitespace-nowrap">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2e6f73] leading-tight">
              BECOME A MEMBER
            </h3>
            <div className="mt-2 h-2 rounded bg-[#d8b06a]" />
          </div>
        </div>
        {/* Right */}
        <Button text="Join now" onClick={() => onNavigate("profile")} />
      </div>
    </div>
  );
};

export default Login;
