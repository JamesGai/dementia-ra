import React, { useId } from "react";
import { IonSelect, IonSelectOption } from "@ionic/react";

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
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-900">{label}</label>
      <IonSelect
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-1.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#2e6f73]"
      >
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </div>
  );
};

export default LabeledSelectionInput;
