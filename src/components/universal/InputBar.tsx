import React from "react";
import { IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";
import VoiceInputButton from "./VoiceInputButton";

interface InputBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  onFocus?: () => void;
  onVoiceInput?: () => void;
  disabled?: boolean;
  isVoiceListening?: boolean;
  isVoiceSupported?: boolean;
  placeholder?: string;
  voiceDisabled?: boolean;
  voiceError?: string | null;
  leftIcon?: string;
  submitAriaLabel?: string;
  outerClassName?: string;
}

const InputBar: React.FC<InputBarProps> = ({
  value = "",
  onChange,
  onSubmit,
  onFocus,
  onVoiceInput,
  disabled = false,
  isVoiceListening = false,
  isVoiceSupported = false,
  placeholder = "Type a message...",
  voiceDisabled = false,
  voiceError = null,
  leftIcon,
  submitAriaLabel = "Submit",
  outerClassName,
}) => {
  const isSubmitDisabled = disabled || !onSubmit;

  return (
    <div className={outerClassName ?? "space-y-2"}>
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-2xl border-2 border-green-600 bg-white px-4 py-2">
          <div className="flex items-center gap-3">
            {leftIcon && (
              <IonIcon
                icon={leftIcon}
                className="shrink-0 text-xl text-gray-500"
              />
            )}
            <input
              disabled={disabled}
              value={value}
              type="text"
              placeholder={placeholder}
              className="w-full bg-transparent text-lg outline-none"
              onChange={(e) => onChange?.(e.target.value)}
              onFocus={onFocus}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled) {
                  onSubmit?.();
                }
              }}
            />
          </div>
        </div>
        {onVoiceInput && (
          <VoiceInputButton
            onClick={onVoiceInput}
            isListening={isVoiceListening}
            isSupported={isVoiceSupported}
            disabled={disabled || voiceDisabled}
          />
        )}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="h-12 w-12 rounded-full flex items-center justify-center text-gray-600 transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={submitAriaLabel}
        >
          <IonIcon icon={send} className="text-3xl" />
        </button>
      </div>
      {voiceError && <p className="px-1 text-sm text-red-600">{voiceError}</p>}
    </div>
  );
};

export default InputBar;
