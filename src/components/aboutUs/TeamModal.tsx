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

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose }) => {
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
        <div className="p-4 space-y-6">
          {/* Intro */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-gray-700 leading-relaxed">
              We are a team of international researchers passionate about
              improving the caregiving skills and mental health of those who
              care for someone with dementia.
            </p>
          </div>
          {/* New Zealand */}
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
            <h2 className="text-xl font-extrabold text-gray-900">
              New Zealand
            </h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-800">Mr. James Gai</p>
                <p className="italic text-gray-600">Research Staff</p>
                <p className="text-gray-600">The University of Auckland</p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default TeamModal;
