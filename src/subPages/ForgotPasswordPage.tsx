import React from "react";
import { IonButton } from "@ionic/react";

interface ForgotPasswordPageProps {
  onBack: () => void;
}

const handleEmail = () => {
  console.log("Reset password email successfully sent");
};

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome card */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-2">
        <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
          Get Started
        </div>
        <p className="text-gray-700 leading-relaxed">
          Enter your email to reset password
        </p>
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

      {/* Send email button */}
      <IonButton
        onClick={handleEmail}
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
        Send
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
  );
};

export default ForgotPasswordPage;
