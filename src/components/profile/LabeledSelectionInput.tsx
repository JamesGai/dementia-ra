import React, { useId } from "react";
import { IonSelect, IonSelectOption } from "@ionic/react";

interface LabeledSelectionInputProps {
  label: string;
  placeholder: string;
  value?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  onChange: (value: string) => void;
}

const LabeledSelectionInput: React.FC<LabeledSelectionInputProps> = ({
  label,
  placeholder,
  value,
  options,
  error,
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
        className={[
          "rounded-xl border bg-white px-4 py-1.5 text-gray-900 focus:border-[#2e6f73]",
          error ? "border-red-500" : "border-gray-200",
        ].join(" ")}
      >
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default LabeledSelectionInput;
