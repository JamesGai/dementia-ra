import React from "react";
import Button from "../components/universal/Button";
import LabeledInput from "../components/profile/LabeledInput";
import TextButton from "../components/universal/TextButton";
import Settings from "../components/profile/Settings";
import TopBar from "../components/universal/TopBar";

interface ProfilePageProps {
  onNavigate: (tab: "createAccount" | "forgotPassword") => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  isLoggedIn,
  onLogin,
  onLogout,
}) => {
  return (
    <div className="p-4 space-y-6">
      <TopBar title="Profile" />
      {/* Logged out state */}
      {!isLoggedIn && (
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
          <Button text="Login" onClick={onLogin} />
          <div className="text-center">
            <TextButton
              text="Don't have account?"
              onClick={() => onNavigate("createAccount")}
            />
          </div>
        </div>
      )}
      <Settings />
      {/* Logged in state */}
      {isLoggedIn && <Button text="Logout" onClick={onLogout} />}
    </div>
  );
};

export default ProfilePage;
