import React from "react";
import { IonSearchbar } from "@ionic/react";
import VoiceInputButton from "../universal/VoiceInputButton";

interface KeywordSearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch?: (value: string) => void;
  onActivate?: () => void;
  onVoiceInput?: () => void;
  isVoiceListening?: boolean;
  isVoiceSupported?: boolean;
  voiceDisabled?: boolean;
  voiceError?: string | null;
}

const SearchBar: React.FC<KeywordSearchBarProps> = ({
  placeholder = "Search resources...",
  value,
  onSearch,
  onActivate,
  onVoiceInput,
  isVoiceListening = false,
  isVoiceSupported = false,
  voiceDisabled = false,
  voiceError = null,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
          <IonSearchbar
            value={value}
            placeholder={placeholder}
            debounce={400}
            onIonInput={(e) => {
              const nextValue = e.detail.value ?? "";
              onSearch?.(nextValue);
            }}
            onIonFocus={onActivate}
            className="custom-searchbar"
            style={
              {
                "--background": "transparent",
                "--box-shadow": "none",
                padding: "0",
              } as any
            }
          />
        </div>
        {onVoiceInput && (
          <VoiceInputButton
            onClick={onVoiceInput}
            isListening={isVoiceListening}
            isSupported={isVoiceSupported}
            disabled={voiceDisabled}
          />
        )}
      </div>
      {voiceError && <p className="text-sm text-red-600 px-1">{voiceError}</p>}
    </div>
  );
};

export default SearchBar;
