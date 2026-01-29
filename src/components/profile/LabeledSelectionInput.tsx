import React from "react";
import { IonItem, IonLabel, IonSelect } from "@ionic/react";

interface LabeledSelectionInputProps {
  label: string;
  placeholder?: string;
  children: React.ReactNode;
}

const LabeledSelectionInput: React.FC<LabeledSelectionInputProps> = ({
  label,
  placeholder,
  children,
}) => {
  return (
    <IonItem
      lines="none"
      className={"rounded-xl border border-gray-200 bg-white"}
    >
      <IonLabel
        position="stacked"
        className={"text-sm font-bold text-gray-900 "}
      >
        {label}
      </IonLabel>
      <IonSelect placeholder={placeholder}>{children}</IonSelect>
    </IonItem>
  );
};

export default LabeledSelectionInput;
