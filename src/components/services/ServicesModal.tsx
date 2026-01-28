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
import {
  closeOutline,
  locationOutline,
  mailOutline,
  callOutline,
  linkOutline,
} from "ionicons/icons";
import { Service } from "../../pages/ServicesPage";

type InfoRowProps = {
  icon: string;
  children: React.ReactNode;
  className?: string;
};

const InfoRow: React.FC<InfoRowProps> = ({ icon, children, className }) => {
  return (
    <div className={`flex items-start gap-3 ${className ?? ""}`}>
      <IonIcon
        icon={icon}
        className="w-5 h-5 text-gray-500 shrink-0 mt-1"
        aria-hidden="true"
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
};

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
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {service.description ? <div>{service.description}</div> : null}
                {service.address ? (
                  <InfoRow icon={locationOutline}>
                    <div>{service.address}</div>
                  </InfoRow>
                ) : null}
                {service.email ? (
                  <InfoRow icon={mailOutline}>
                    <div>{service.email}</div>
                  </InfoRow>
                ) : null}
                {service.mobile ? (
                  <InfoRow icon={callOutline}>
                    <div>{service.mobile}</div>
                  </InfoRow>
                ) : null}
                {service.link ? (
                  <InfoRow icon={linkOutline} className="break-words">
                    <span className="font-semibold text-[#2e6f73]">
                      {service.link}
                    </span>
                  </InfoRow>
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
