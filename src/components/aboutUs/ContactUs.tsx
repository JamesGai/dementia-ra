import React from "react";
import { IonButton } from "@ionic/react";

interface ContactUsProps {
  onNavigate: (tab: "contactUs") => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
      <h2 className="text-2xl font-bold text-[#2e6f73]">CONTACT US</h2>
      <p className="text-gray-700 leading-relaxed">
        Need help or more information? You can call, email, or send us a
        message.
      </p>
      <IonButton
        expand="block"
        onClick={() => onNavigate("contactUs")}
        style={
          {
            "--background": "#2e6f73",
            "--color": "#ffffff",
            "--border-radius": "0px",
          } as any
        }
      >
        Contact us
      </IonButton>
    </div>
  );
};

export default ContactUs;
