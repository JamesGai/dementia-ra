// CreateAccountPage.tsx
import React from "react";
import { IonButton } from "@ionic/react";

interface CreateAccountPageProps {
  onBack: () => void;
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onBack }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome card */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-2">
        <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
          Get Started
        </div>
        <p className="text-gray-700 leading-relaxed">
          Create an account to personalise your experience.
        </p>
      </div>

      {/* Create account card */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        {/* Full name */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-900">Full name</div>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2e6f73]"
          />
        </div>
        {/* Email */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-900">Email</div>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2e6f73]"
          />
        </div>
        {/* Password */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-900">Password</div>
          <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#2e6f73]">
            <input
              type="password"
              placeholder="Create a password"
              className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none"
            />
            <button
              type="button"
              className="text-gray-500 font-semibold active:opacity-70"
            >
              Show
            </button>
          </div>
          <p className="text-xs text-gray-500">Use at least 8 characters.</p>
        </div>
        {/* Confirm password */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-900">
            Confirm password
          </div>
          <div className="flex items-center gap-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-[#2e6f73]">
            <input
              type="password"
              placeholder="Re-enter password"
              className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none"
            />
            {/* layout only */}
            <button
              type="button"
              className="text-gray-500 font-semibold active:opacity-70"
            >
              Show
            </button>
          </div>
        </div>
        {/* Terms */}
        <label className="flex items-start gap-3">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#2e6f73]" />
          <span className="text-sm text-gray-700 leading-relaxed">
            I agree to the{" "}
            <span className="font-semibold text-[#2e6f73]">Terms</span> and{" "}
            <span className="font-semibold text-[#2e6f73]">Privacy Policy</span>
            .
          </span>
        </label>
        {/* Create account button */}
        <IonButton
          expand="block"
          style={
            {
              "--background": "#2e6f73",
              "--color": "#ffffff",
              "--border-radius": "0px",
              "--padding-top": "0.9rem",
              "--padding-bottom": "0.9rem",
              fontSize: "1rem",
            } as any
          }
        >
          Create account
        </IonButton>
        {/* Login button*/}
        <div className="text-center">
          <button
            onClick={onBack}
            type="button"
            className="text-sm font-semibold text-[#2e6f73] active:opacity-70"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
