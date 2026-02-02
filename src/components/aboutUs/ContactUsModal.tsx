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
  callOutline,
  locationOutline,
  mailOutline,
} from "ionicons/icons";

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
  const mobile = "+64 21 12345678";
  const email = "user123@auckland.uni.ac.nz";
  const address = "The University of Auckland";

  const openCall = () => {
    // window.location.href = `tel:${mobileToCall}`;
    console.log("Mobile retrieved");
  };
  const openEmail = () => {
    // window.location.href = `mailto:${email}`;
    console.log("Email retrieved");
  };

  const openMaps = () => {
    // const full = `${address}, ${addressLine2}`;
    // window.open(
    //   `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    //     full,
    //   )}`,
    //   "_blank",
    // );
    console.log("Address retrieved");
  };

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
          {/* Contact info */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <div className="bg-[#2e6f73] text-white p-4">
              <h2 className="text-lg font-semibold text-center">
                Contact info
              </h2>
              {/* Mobile */}
              <div className="mt-4 space-y-3">
                <button
                  onClick={openCall}
                  className="w-full flex items-center gap-4 rounded-xl active:bg-white/15 px-4 py-4 text-left"
                >
                  <IonIcon icon={callOutline} className="text-2xl" />
                  <div>
                    <div className="font-semibold">{mobile}</div>
                    <div className="text-sm text-white/80">Tap to call</div>
                  </div>
                </button>
                {/* Email */}
                <button
                  onClick={openEmail}
                  className="w-full flex items-center gap-4 rounded-xl active:bg-white/15 px-4 py-4 text-left"
                >
                  <IonIcon icon={mailOutline} className="text-2xl" />
                  <div>
                    <div className="font-semibold">{email}</div>
                    <div className="text-sm text-white/80">Tap to email</div>
                  </div>
                </button>
                {/* Address */}
                <button
                  onClick={openMaps}
                  className="w-full flex items-center gap-4 rounded-xl active:bg-white/15 px-4 py-4 text-left"
                >
                  <IonIcon icon={locationOutline} className="text-2xl" />
                  <div>
                    <div className="font-semibold">{address}</div>
                    <div className="text-sm text-white/80 mt-1">
                      Tap to open Maps
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* TODO: Add input fields (e.g. first name, message) to handle query submission */}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ContactUsModal;
