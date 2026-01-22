import React from "react";
import CreateAccount from "../components/profile/createAccount";
import Email from "../components/profile/Email";
import LogInOut from "../components/profile/LogInOut";
import Password from "../components/profile/Password";
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
          <Password onNavigate={onNavigate} />
          <LogInOut
            isLoggedIn={isLoggedIn}
            onLogin={onLogin}
            onLogout={onLogout}
          />
          <CreateAccount onNavigate={onNavigate} />
        </div>
      )}
      <Settings />
      {/* Logged in state */}
      {isLoggedIn && (
        <LogInOut
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default ProfilePage;
