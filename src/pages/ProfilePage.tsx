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
      {/* Logged in state */}
      {isLoggedIn && (
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="space-y-1">
            <div className="text-lg font-bold text-gray-900">
              Personal details
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Username</span>
            <span className="text-gray-500">12345</span>
          </div>
          <LabeledInput type="text" label="First name" value="James" readOnly />
          <LabeledInput type="text" label="Last name" value="Gai" readOnly />
          <LabeledInput
            type="text"
            label="Phone number"
            value="12345"
            readOnly
          />
          <LabeledInput
            type="email"
            label="Email"
            value="jamesgai@example.com"
            readOnly
          />
          <LabeledInput type="text" label="City" value="Auckland" readOnly />
        </div>
      )}
      <Settings />
      {/* Logged in state */}
      {isLoggedIn && <Button text="Logout" onClick={onLogout} />}
    </div>
  );
};

export default ProfilePage;
