import React from "react";
import { IonButton, IonIcon } from "@ionic/react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  isFilter?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  isFilter = false,
  icon,
  iconPosition = "left",
}) => {
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
          fontSize: "1rem",
        } as React.CSSProperties
      }
    >
      <div className="w-full flex items-center justify-between gap-3">
        {icon && iconPosition === "left" && (
          <IonIcon icon={icon} className="text-xl" />
        )}
        <span className="font-semibold flex-1 text-center">{text}</span>
        {icon && iconPosition === "right" && (
          <IonIcon icon={icon} className="text-xl" />
        )}
      </div>
    </IonButton>
  );
};

export default Button;
