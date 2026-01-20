import React, { useState } from "react";
import { IonButton } from "@ionic/react";

interface ProfilePageProps {
  onNavigate: (tab: "createAccount" | "forgotPassword") => void;
  onLogin: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onLogin }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900">Profile</div>
        <div className="w-[56px]" />
      </div>

      {/* Login card */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-900">Email</div>
          <input
            type="text"
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
        {/* Remember me */}
        <label className="flex items-center gap-3">
          <input type="checkbox" className="h-4 w-4 accent-[#2e6f73]" />
          <span className="text-sm font-semibold text-gray-900">
            Remember me
          </span>
        </label>
        {/* Login button */}
        <IonButton
          onClick={onLogin}
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
          Login
        </IonButton>
        {/* Create account button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate("createAccount")}
            type="button"
            className="text-sm font-semibold text-[#2e6f73] active:opacity-70"
          >
            Don’t have an account?
          </button>
        </div>
      </div>

      {/* Settings */}
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
    </div>
  );
};

export default ProfilePage;
