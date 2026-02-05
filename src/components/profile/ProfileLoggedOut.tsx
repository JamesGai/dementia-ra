import React from "react";
import Button from "../universal/Button";
import LabeledInput from "./LabeledInput";
import TextButton from "../universal/TextButton";

type ProfileLoggedOutProps = {
  onNavigate: (tab: "createAccount" | "forgotPassword") => void;
  onTestLogin: () => void;
};

const ProfileLoggedOut: React.FC<ProfileLoggedOutProps> = ({
  onNavigate,
  onTestLogin,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
      <LabeledInput label="Email" type="email" placeholder="Enter email" />
      <LabeledInput
        label="Password"
        type="password"
        placeholder="Enter password"
        showToggle
      />
      <TextButton
        text="Forgot password?"
        onClick={() => onNavigate("forgotPassword")}
      />
      <Button text="Test Login" onClick={onTestLogin} />
      <div className="text-center">
        <TextButton
          text="Don't have account?"
          onClick={() => onNavigate("createAccount")}
        />
      </div>
    </div>
  );
};

export default ProfileLoggedOut;
