import React from "react";
import { IonButton } from "@ionic/react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <IonButton
      onClick={onClick}
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
      {text}
    </IonButton>
  );
};

export default Button;
