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
import { Service } from "../../services/serviceService";

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

const ServiceModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const handleClose = () => {
    onClose();
  };

  const mapQuery = service?.address ?? service?.name ?? "";
  const mapSrc = mapQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        mapQuery
      )}&z=15&output=embed`
    : null;
  const googleMapsUrl = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        mapQuery
      )}`
    : null;

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
                {service.name}
              </div>
              <div className="h-px w-full bg-gray-300" />
              {mapSrc ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <iframe
                    title={`Map for ${service.name}`}
                    src={mapSrc}
                    className="pointer-events-none h-48 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                  </div>
                  {googleMapsUrl ? (
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-[#2e6f73]"
                    >
                      <IonIcon icon={locationOutline} aria-hidden="true" />
                      Open in Google Maps
                    </a>
                  ) : null}
                </div>
              ) : null}
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
                {service.phone ? (
                  <InfoRow icon={callOutline}>
                    <div>{service.phone}</div>
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

export default ServiceModal;
