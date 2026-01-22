import React from "react";
import { IonButton } from "@ionic/react";

interface ProfilePageProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const LogInOut: React.FC<ProfilePageProps> = ({
  isLoggedIn,
  onLogin,
  onLogout,
}) => {
  return (
    <IonButton
      onClick={isLoggedIn ? onLogout : onLogin}
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
      {isLoggedIn ? "Logout" : "Login"}
    </IonButton>
  );
};

export default LogInOut;
