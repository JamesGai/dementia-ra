import React from "react";
import { IonFooter, IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const InputBar: React.FC<InputBarProps> = ({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Type a message...",
}) => {
  return (
    <IonFooter className="ion-no-border">
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-2xl border-2 border-green-600 bg-white px-4 py-2">
            <input
              disabled={disabled}
              value={value}
              type="text"
              placeholder={placeholder}
              className="w-full text-lg bg-transparent outline-none"
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !disabled) onSend();
              }}
            />
          </div>
          <button
            type="button"
            onClick={onSend}
            disabled={disabled}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <IonIcon icon={send} className="text-3xl" />
          </button>
        </div>
      </div>
    </IonFooter>
  );
};

export default InputBar;
