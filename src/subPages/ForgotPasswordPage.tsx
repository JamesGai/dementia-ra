import React from "react";
import Button from "../components/universe/Button";
import Email from "../components/profile/Email";
import GetStarted from "../components/profile/GetStarted";

interface ForgotPasswordPageProps {
  onBack: () => void;
}

const handleEmail = () => {
  console.log("Reset password email successfully sent");
};

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  return (
    <div className="p-4 space-y-6">
      <GetStarted content="Enter your email to reset password" />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <Email />
        <Button text="Send" onClick={handleEmail} />
      </div>

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
