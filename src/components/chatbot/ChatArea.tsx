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
  const formatMessageDateTime = (timestamp: number) =>
    new Intl.DateTimeFormat("en-NZ", {
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(timestamp));

  return (
    <IonContent className="bg-[#eef2f5]" ref={contentRef}>
      <div className="px-4 py-6 space-y-6">
        {messages.map((msg) =>
          msg.sender === "bot" ? (
            <div key={msg.id} className="flex items-end gap-4">
              <div className="w-10 h-10 rounded-full bg-[#7fb0c8] flex items-center justify-center shrink-0">
                <IonIcon
                  icon={chatbubbleEllipses}
                  className="text-white text-xl"
                />
              </div>
              <div className="max-w-[70%]">
                <div className="bg-[#2e6f73] text-white rounded-2xl px-6 py-5 shadow-md">
                  <div className="text-lg leading-snug">{msg.text}</div>
                </div>
                <div className="mt-1 px-1 text-xs text-gray-500">
                  {formatMessageDateTime(msg.createdAt)}
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[70%]">
                <div className="bg-white text-gray-900 rounded-2xl px-6 py-5 shadow-xl">
                  <div className="text-lg leading-snug">{msg.text}</div>
                </div>
                <div className="mt-1 px-1 text-xs text-gray-500 text-right">
                  {formatMessageDateTime(msg.createdAt)}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </IonContent>
  );
};

export default ChatArea;
