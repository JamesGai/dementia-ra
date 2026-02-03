import React from "react";
import { IonFooter, IonIcon } from "@ionic/react";
import { send } from "ionicons/icons";

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChange, onSend }) => {
  return (
    <IonFooter className="ion-no-border">
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex-1 rounded-2xl border-2 border-green-600 bg-white px-4 py-2">
            <input
              value={value}
              type="text"
              placeholder="Type a message..."
              className="w-full text-lg bg-transparent outline-none"
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSend();
              }}
            />
          </div>
          <button
            type="button"
            onClick={onSend}
            className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition"
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
