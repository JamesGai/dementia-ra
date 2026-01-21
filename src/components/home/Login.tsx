import React from "react";
import { IonButton } from "@ionic/react";

interface LoginProps {
  onJoin: () => void;
}

const Login: React.FC<LoginProps> = ({ onJoin }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
      <div className="flex items-center justify-between gap-4">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div className="inline-block whitespace-nowrap">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2e6f73] leading-tight">
              BECOME A MEMBER
            </h3>
            <div className="mt-2 h-2 rounded bg-[#d8b06a]" />
          </div>
        </div>

        {/* Right */}
        <IonButton
          onClick={onJoin}
          className="shrink-0"
          style={
            {
              "--background": "#2e6f73",
              "--color": "#ffffff",
              "--border-radius": "0px",
              "--padding-start": "1.5rem",
              "--padding-end": "1.5rem",
              "--padding-top": "0.9rem",
              "--padding-bottom": "0.9rem",
              fontSize: "1rem",
            } as any
          }
        >
          Join now
        </IonButton>
      </div>
    </div>
  );
};

export default Login;
