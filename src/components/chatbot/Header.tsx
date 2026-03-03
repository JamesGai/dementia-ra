import React from "react";
import { IonHeader, IonIcon, IonToolbar } from "@ionic/react";
import { chatbubbleEllipses, trashOutline } from "ionicons/icons";

interface HeaderProps {
  title?: string;
  status?: string;
  onEraseHistory?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "e-DiVA chatbot",
  status = "Online",
  onEraseHistory,
}) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-100 bg-white">
          <div className="relative w-[56px] h-[56px] rounded-full bg-[#7fb0c8] flex items-center justify-center shrink-0">
            <IonIcon
              icon={chatbubbleEllipses}
              className="text-white text-2xl"
            />
            <span className="absolute -right-0.5 bottom-1 w-3.5 h-3.5 rounded-full bg-[#47d147] ring-2 ring-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-2xl font-bold text-gray-900">{title}</div>
            <div className="text-base text-gray-400">{status}</div>
          </div>
          <button
            type="button"
            onClick={onEraseHistory}
            aria-label="Erase chat history"
            className="self-start mt-1 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-95 transition"
          >
            <IonIcon icon={trashOutline} className="text-xl" />
          </button>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
