import React, { useEffect, useRef, useState } from "react";
import { IonPage } from "@ionic/react";
import ChatArea from "../components/chatbot/ChatArea";
import Header from "../components/chatbot/Header";
import InputBar from "../components/chatbot/InputBar";
import { getChatbotReply } from "../services/chatbotService";
import type { ChatMessage } from "../components/chatbot/ChatArea";

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello, how can I help you today?",
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const handleSendMessage = async () => {
    const text = input.trim();
    if (!text || isSending) return;
    const now = Date.now();

    setMessages((prev) => [
      ...prev,
      { id: now, sender: "user", text, createdAt: now },
    ]);
    setInput("");
    setIsSending(true);

    try {
      const reply = await getChatbotReply(text);
      const replyNow = Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: replyNow,
          sender: "bot",
          text: reply,
          createdAt: replyNow,
        },
      ]);
    } catch (error) {
      console.error(error);
      const replyNow = Date.now();
      setMessages((prev) => [
        ...prev,
        {
          id: replyNow,
          sender: "bot",
          text: "I am unable to connect to the chatbot service right now. Please try again.",
          createdAt: replyNow,
        },
      ]);
    } finally {
      setIsSending(false);
    }
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
      <InputBar
        value={input}
        onChange={setInput}
        onSend={handleSendMessage}
        disabled={isSending}
        placeholder={isSending ? "Waiting for chatbot response..." : "Type a message..."}
      />
    </IonPage>
  );
};

export default ChatbotPage;
