import React from "react";
import { IonButton } from "@ionic/react";

interface TitleButtonProps {
  title: string;
  text: string;
  onClick: () => void;
}

const TitleButton: React.FC<TitleButtonProps> = ({
  title,
  text,
  onClick,
}) => {
  return (
    <IonButton
      onClick={onClick}
      expand="block"
      style={
        {
          "--background": "#2e6f73",
          "--color": "#ffffff",
          "--border-radius": "0px",
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
          "--padding-start": "1rem",
          "--padding-end": "1rem",
          fontSize: "1rem",
          textTransform: "none",
        } as any
      }
    >
      <div className="w-full text-left space-y-1">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-base opacity-90">{text}</div>
      </div>
    </IonButton>
  );
};

export default TitleButton;
