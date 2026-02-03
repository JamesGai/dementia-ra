import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
} from "@ionic/react";
import { closeOutline, chatbubbleEllipses, send } from "ionicons/icons";

const ChatbotPage: React.FC = () => {
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

            {/* Close */}
            <IonButtons slot="end">
              <IonButton onClick={() => console.log("close")}>
                <IonIcon
                  icon={closeOutline}
                  className="text-3xl text-gray-500"
                />
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      {/* Chat area */}
      <IonContent fullscreen className="bg-[#eef2f5]">
        <div className="px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#7fb0c8] flex items-center justify-center shrink-0">
              <IonIcon
                icon={chatbubbleEllipses}
                className="text-white text-xl"
              />
            </div>

            <div className="bg-[#2e6f73] text-white rounded-2xl px-6 py-5 shadow-md max-w-[70%]">
              <div className="text-xl leading-snug">
                Hi! How can I help you today?
              </div>
            </div>
          </div>
        </div>
      </IonContent>

      {/* Input bar (fixed at bottom of the page area) */}
      <IonFooter className="ion-no-border">
        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-2xl border-2 border-green-600 bg-white px-4 py-2">
              <IonInput placeholder="Type a message..." className="text-lg" />
            </div>

            <button
              type="button"
              onClick={() => console.log("send")}
              className="w-12 h-12 rounded-full flex items-center justify-center text-gray-600 active:scale-95 transition"
              aria-label="Send message"
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
