import React, { useEffect, useRef, useState } from "react";
import { IonPage } from "@ionic/react";
import ChatArea from "../components/chatbot/ChatArea";
import Header from "../components/chatbot/Header";
import InputBar from "../components/chatbot/InputBar";

type Sender = "bot" | "user";

type ChatMessage = {
  id: number;
  sender: Sender;
  text: string;
  createdAt: number;
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "bot",
      text: "The chatbot is being developed",
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
    // Automatic replay after a short delay
    setTimeout(() => {
      const now = Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: now,
          sender: "bot",
          text: "The chatbot is being developed",
          createdAt: now,
        },
      ]);
    }, 600);
    setInput("");
  };

  const scrollToBottom = React.useCallback(() => {
    contentRef.current?.scrollToBottom(250);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <IonPage>
      <Header title="e-DiVA chatbot" status="Online" />
      <ChatArea messages={messages} contentRef={contentRef} />
      <InputBar value={input} onChange={setInput} onSend={handleSendMessage} />
    </IonPage>
  );
};

export default ChatbotPage;
