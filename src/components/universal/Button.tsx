import React from "react";
import { IonButton } from "@ionic/react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  isFilter?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isFilter }) => {
  return (
    <IonButton
      onClick={onClick}
      expand="block"
      style={
        {
          "--background": isFilter ? "#9ca3af" : "#2e6f73",
          "--color": "#ffffff",
          "--border-radius": "0px",
          "--padding-top": "0.9rem",
          "--padding-bottom": "0.9rem",
          ...(isFilter && {
            "--border-width": "2px",
            "--border-style": "solid",
            "--border-color": "#d1d5db",
          }),
          fontSize: "1rem",
        } as React.CSSProperties
      }
    >
      {text}
    </IonButton>
  );
};

export default Button;
