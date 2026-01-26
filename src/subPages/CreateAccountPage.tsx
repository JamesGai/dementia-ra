import React from "react";
import Button from "../components/universal/Button";
import ConfirmPassword from "../components/profile/createAccount/ConfirmPassword";
import Email from "../components/profile/Email";
import FullName from "../components/profile/createAccount/fullname";
import GetStarted from "../components/profile/GetStarted";
import Password from "../components/profile/Password";
import Terms from "../components/profile/createAccount/Terms";
import TextButton from "../components/universal/TextButton";

interface CreateAccountPageProps {
  onBack: () => void;
}

const handleCreate = () => {
  console.log("Account successfully created");
};

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onBack }) => {
  return (
    <div className="p-4 space-y-6">
      <GetStarted content="Create an account to personalise your experience." />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <FullName />
        <Email />
        <Password />
        <ConfirmPassword />
        <Terms />
        <Button text="Create account" onClick={handleCreate} />
        <div className="text-center">
          <TextButton text="Already have an account?" onClick={onBack} />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
