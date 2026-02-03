import React from "react";
import { IonContent, IonIcon } from "@ionic/react";
import { chatbubbleEllipses } from "ionicons/icons";

export type Sender = "bot" | "user";

export type ChatMessage = {
  id: number;
  sender: Sender;
  text: string;
  createdAt: number;
};

interface ChatAreaProps {
  messages: ChatMessage[];
  contentRef?: React.Ref<HTMLIonContentElement>;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, contentRef }) => {
  return (
    <IonContent fullscreen className="bg-[#eef2f5]" ref={contentRef}>
      <div className="px-4 py-6 space-y-6">
        {messages.map((msg) =>
          msg.sender === "bot" ? (
            <div key={msg.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#7fb0c8] flex items-center justify-center shrink-0">
                <IonIcon
                  icon={chatbubbleEllipses}
                  className="text-white text-xl"
                />
              </div>
              <div className="bg-[#2e6f73] text-white rounded-2xl px-6 py-5 shadow-md max-w-[70%]">
                <div className="text-xl leading-snug">{msg.text}</div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end">
              <div className="bg-white text-gray-900 rounded-2xl px-6 py-5 shadow-md max-w-[70%] border">
                <div className="text-xl leading-snug">{msg.text}</div>
              </div>
            </div>
          ),
        )}
      </div>
    </IonContent>
  );
};

export default ChatArea;
