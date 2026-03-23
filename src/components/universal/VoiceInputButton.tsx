import React from "react";
import { IonIcon } from "@ionic/react";
import { mic, micOff } from "ionicons/icons";

interface VoiceInputButtonProps {
  disabled?: boolean;
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  disabled = false,
  isListening,
  isSupported,
  onClick,
}) => {
  const isDisabled = disabled || !isSupported;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={
        isSupported
          ? isListening
            ? "Stop voice input"
            : "Start voice input"
          : "Voice input unavailable"
      }
      className={`h-12 w-12 shrink-0 rounded-full border flex items-center justify-center transition active:scale-95 ${
        isListening
          ? "border-[#2e6f73] bg-[#2e6f73] text-white shadow-md"
          : "border-gray-200 bg-white text-[#2e6f73] shadow-sm"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <IonIcon icon={isListening ? micOff : mic} className="text-2xl" />
    </button>
  );
};

export default VoiceInputButton;
