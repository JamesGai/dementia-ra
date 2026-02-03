import React from "react";
import { IonIcon } from "@ionic/react";
import { chatbubbleEllipses } from "ionicons/icons";

interface ChatbotProps {
  onNavigate: (tab: "chatbot") => void;
}

const ChatbotButton: React.FC<ChatbotProps> = ({ onNavigate }) => {
  return (
    <div
      className="
        w-full
        rounded-full
        overflow-hidden
        shadow-[0_10px_22px_rgba(0,90,220,0.28)]
      "
    >
      <button
        type="button"
        onClick={() => onNavigate("chatbot")}
        className="
          w-full h-[78px]
          bg-gradient-to-b from-[#2dbbff] to-[#1a7dff]
        "
      >
        <div className="flex items-center justify-center h-full gap-10 text-white">
          <div className="w-[54px] h-[54px] rounded-full bg-white flex items-center justify-center">
            <IonIcon
              icon={chatbubbleEllipses}
              className="text-[26px] text-[#1a7dff]"
            />
          </div>
          <div className="text-[22px] font-extrabold">Support Bot</div>
        </div>
      </button>
    </div>
  );
};

export default ChatbotButton;
