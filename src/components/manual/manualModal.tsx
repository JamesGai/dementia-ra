import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { ManualSection } from "../../pages/ManualPage";

const SECTION_TITLES: Record<ManualSection, string> = {
  login: "Log-in",
  profile: "Update your profile",
  search: "Search e-DiVA content",
  course: "Online Course",
  diary: "Diary",
  peer: "Peer-Support",
  videos: "Video/Animations",
  service: "Dementia Services",
  chatbot: "Chatbot",
};

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  section?: ManualSection;
}

const ManualModal: React.FC<ManualModalProps> = ({
  isOpen,
  onClose,
  section,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={handleClose}
              aria-label="Close"
              className="w-11 h-11 rounded-full flex items-center justify-center"
            >
              <IonIcon icon={closeOutline} className="text-2xl" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!section ? (
          <div className="bg-white rounded-2xl p-4 shadow-md text-gray-500">
            No manual section selected.
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
            <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
              {SECTION_TITLES[section]}
            </div>
            <p className="text-gray-700 leading-relaxed">
              Add the instructions for{" "}
              <span className="font-semibold">{SECTION_TITLES[section]}</span>{" "}
              here.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Step 1: ...</li>
              <li>Step 2: ...</li>
              <li>Step 3: ...</li>
            </ul>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ManualModal;
