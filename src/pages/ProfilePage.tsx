import React from "react";
import Button from "../components/universe/Button";
import Email from "../components/profile/Email";
import Password from "../components/profile/Password";
import TextButton from "../components/profile/TextButton";
import Settings from "../components/profile/Settings";
import TopBar from "../components/universe/TopBar";

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
          <Email />
          <Password />
          <TextButton isForgotPassword={true} onNavigate={onNavigate} />
          <Button text="Login" onClick={onLogin} />
          <div className="text-center">
            <TextButton isForgotPassword={false} onNavigate={onNavigate} />
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
