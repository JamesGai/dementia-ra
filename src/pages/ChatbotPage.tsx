import React, { useEffect, useRef, useState } from "react";
import { IonAlert, IonPage } from "@ionic/react";
import { getChatbotReply } from "../services/chatbotService";
import ChatArea, { ChatMessage } from "../components/chatbot/ChatArea";
import Header from "../components/chatbot/Header";
import InputBar from "../components/chatbot/InputBar";

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
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const handleSendMessage = async () => {
    const text = input.trim();
    if (!text || isSending) return;
    const now = Date.now();
    const pendingReplyId = now + 1;
    setMessages((prev) => [
      ...prev,
      { id: now, sender: "user", text, createdAt: now },
      {
        id: pendingReplyId,
        sender: "bot",
        text: "...",
        createdAt: pendingReplyId,
      },
    ]);
    setInput("");
    setIsSending(true);
    try {
      // Toggle the following comment to activate LLM API accessibility, otherwise chatbot is in mock mode
      const reply = await getChatbotReply(text);
      // const reply = "Chatbot is being developed";
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === pendingReplyId
            ? { ...msg, text: reply, createdAt: Date.now() }
            : msg,
        ),
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === pendingReplyId
            ? {
                ...msg,
                text: "I am unable to connect to the chatbot service right now. Please try again.",
                createdAt: Date.now(),
              }
            : msg,
        ),
      );
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
      <Header
        title="e-DiVA chatbot"
        status="Online"
        onEraseHistory={() => setIsDeleteAlertOpen(true)}
      />
      <ChatArea messages={messages} contentRef={contentRef} />
      <InputBar
        value={input}
        onChange={setInput}
        onSend={handleSendMessage}
        disabled={isSending}
        placeholder={
          isSending ? "Waiting for chatbot response..." : "Type a message..."
        }
      />
      <IonAlert
        isOpen={isDeleteAlertOpen}
        onDidDismiss={() => setIsDeleteAlertOpen(false)}
        header="Confirm Chat History Deletion"
        message="Are you sure you want to delete your chat history? This action cannot be undone."
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Delete",
            handler: () => {
              // Delete logic will be implemented later.
              setIsDeleteAlertOpen(false);
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default ChatbotPage;
