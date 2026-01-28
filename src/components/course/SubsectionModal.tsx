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
import { SubsectionItem } from "../../subPages/iSupportNZPage";

interface SubsectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subsection?: SubsectionItem;
}

const SubsectionModal: React.FC<SubsectionModalProps> = ({
  isOpen,
  onClose,
  subsection,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
      {/* Header */}
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
      {/* Content */}
      <IonContent className="ion-padding">
        {!subsection ? (
          <div className="bg-white rounded-2xl p-4 shadow-md text-gray-500">
            No subsection selected.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="text-[#2e6f73] font-extrabold tracking-wide">
                {subsection.number}. {subsection.title}
              </div>
              <div className="h-px w-full bg-gray-300" />
              <div className="text-gray-700 leading-relaxed">
                Content coming soon
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default SubsectionModal;
