import React from "react";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";

interface LabeledSelectionInputProps {
  label: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
}

const LabeledSelectionInput: React.FC<LabeledSelectionInputProps> = ({
  label,
  placeholder,
  options,
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
      <IonSelect placeholder={placeholder}>
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};

export default LabeledSelectionInput;
