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
import { Service } from "../../pages/ServicesPage";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service;
}

const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  service,
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
        {!service ? (
          <div className="bg-white rounded-2xl p-4 shadow-md text-sm text-gray-500">
            No service selected.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Title + Details */}
            <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
              <div className="text-[#2e6f73] font-extrabold tracking-wide">
                {service.title}
              </div>
              <div className="h-px w-full bg-gray-300" />
              <div className="space-y-2 text-gray-700 leading-relaxed">
                {service.description ? (
                  <div className="text-gray-500">{service.description}</div>
                ) : null}

                {service.address ? (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Address:{" "}
                    </span>
                    {service.address}
                  </div>
                ) : null}

                {service.email ? (
                  <div>
                    <span className="font-semibold text-gray-900">Email: </span>
                    {service.email}
                  </div>
                ) : null}

                {service.mobile ? (
                  <div>
                    <span className="font-semibold text-gray-900">Phone: </span>
                    {service.mobile}
                  </div>
                ) : null}

                {service.link ? (
                  <div className="break-words">
                    <span className="font-semibold text-gray-900">
                      Website:{" "}
                    </span>
                    <span className="font-semibold text-[#2e6f73]">
                      {service.link}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ServicesModal;
