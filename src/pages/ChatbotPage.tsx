import React, { useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
} from "@ionic/react";
import { chatbubbleEllipses, send } from "ionicons/icons";

type Sender = "bot" | "user";

type ChatMessage = {
  id: number;
  sender: Sender;
  text: string;
  createdAt: number; // timestamp for ordering if needed
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! How can I help you today?",
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const handleSendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: now, sender: "user", text, createdAt: now },
    ]);
    setInput("");
  };

  const scrollToTop = React.useCallback(() => {
    contentRef.current?.scrollToTop(0);
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [messages, scrollToTop]);

  return (
    <IonPage>
      {/* Header */}
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-100 bg-white">
            {/* Avatar */}
            <div className="relative w-[56px] h-[56px] rounded-full bg-[#7fb0c8] flex items-center justify-center shrink-0">
              <IonIcon
                icon={chatbubbleEllipses}
                className="text-white text-2xl"
              />
              <span className="absolute -right-0.5 bottom-1 w-3.5 h-3.5 rounded-full bg-[#47d147] ring-2 ring-white" />
            </div>
            {/* Title */}
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-extrabold text-gray-900 truncate">
                e-DiVA chatbot
              </div>
              <div className="text-base text-gray-400">Online</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      {/* Chat area */}
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
      {/* Input bar */}
      <IonFooter className="ion-no-border">
        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-2xl border-2 border-green-600 bg-white px-4 py-2">
              <input
                value={input}
                type="text"
                placeholder="Type a message..."
                className="w-full text-lg bg-transparent outline-none"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
            </div>
            {/* Send button */}
            <button
              type="button"
              onClick={handleSendMessage}
              className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition"
            >
              <IonIcon icon={send} className="text-3xl" />
            </button>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default ChatbotPage;
