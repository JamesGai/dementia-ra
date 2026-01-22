import React from "react";
import Button from "../components/universe/Button";
import Email from "../components/profile/Email";
import GetStarted from "../components/profile/GetStarted";
import TextButton from "../components/universe/TextButton";

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
        <div className="text-center">
          <TextButton text="Already have an account?" onClick={onBack} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
