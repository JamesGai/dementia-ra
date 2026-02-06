import React, { useId } from "react";
import { IonSelect, IonSelectOption } from "@ionic/react";

interface LabeledSelectionInputProps {
  label: string;
  placeholder: string;
  value?: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

const LabeledSelectionInput: React.FC<LabeledSelectionInputProps> = ({
  label,
  placeholder,
  value,
  options,
  onChange,
}) => {
  const customModalOptions = {
    header: label,
    breakpoints: [0, 0.5],
    initialBreakpoint: 0.5,
  };

  return (
    <div className="space-y-2">
      <IonSelect
        label={label}
        placeholder={placeholder}
        value={value}
        onIonChange={(e) => onChange(e.detail.value)}
        interface="modal"
        interfaceOptions={customModalOptions}
        justify="space-between"
        className="rounded-xl border border-gray-200 bg-white px-4 py-1.5 text-gray-900 focus:border-[#2e6f73]"
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
