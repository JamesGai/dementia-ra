import React from "react";
import { IonButton } from "@ionic/react";

interface TheTeamProps {
  onNavigate: (tab: "team") => void;
}

const TheTeam: React.FC<TheTeamProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
      <div className="text-[#2e6f73] font-extrabold tracking-wide">
        THE TEAM
      </div>
      <p className="text-gray-700 leading-relaxed">
        If you would like to read more about our team members, please see the
        Research Team page.
      </p>
      <IonButton
        onClick={() => onNavigate("team")}
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
        View Research Team
      </IonButton>
    </div>
  );
};

export default TheTeam;
