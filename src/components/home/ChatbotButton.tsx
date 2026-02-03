import React from "react";
import Button from "../universal/Button";
import TitleButton from "../universal/TitleButton";

interface ChatbotProps {
  onNavigate: (tab: "chatbot") => void;
}

const ChatbotButton: React.FC<ChatbotProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
      <TitleButton
        title="Chatbot"
        text="Chatbot"
        onClick={() => onNavigate("chatbot")}
      />
    </div>
  );
};

export default ChatbotButton;
