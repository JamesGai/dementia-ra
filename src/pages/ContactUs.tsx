import React, { useMemo, useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTextarea,
} from "@ionic/react";
import { callOutline, mailOutline, locationOutline } from "ionicons/icons";

interface ContactUsProps {
  onBack: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const phoneDisplay = "+61 3 83872305";
  const phoneTel = "+61383872305";
  const email = "ediva@nari.edu.au";
  const addressLine1 = "34-54 Poplar Road (via Gate4)";
  const addressLine2 = "Parkville Victoria 3052 Australia";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const canSubmit = useMemo(
    () =>
      firstName.trim() &&
      lastName.trim() &&
      isValidEmail(fromEmail) &&
      message.trim(),
    [firstName, lastName, fromEmail, message],
  );

  const openCall = () => (window.location.href = `tel:${phoneTel}`);
  const openEmail = () => (window.location.href = `mailto:${email}`);
  const openMaps = () => {
    const full = `${addressLine1}, ${addressLine2}`;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        full,
      )}`,
      "_blank",
    );
  };

  const handleSubmit = () => {
    const subject = `e-DiVA Contact Request from ${firstName.trim()} ${lastName.trim()}`;
    const body = [
      `Name: ${firstName.trim()} ${lastName.trim()}`,
      `Email: ${fromEmail.trim()}`,
      "",
      "Message:",
      message.trim(),
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Top bar (since you’re not using routing) */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-[#2e6f73] font-semibold">
          ← Back
        </button>
        <div className="text-lg font-bold text-gray-900">Contact Us</div>
        <div className="w-[56px]" />
      </div>

      {/* Contact Info */}
      <div className="rounded-2xl overflow-hidden shadow-md">
        <div className="bg-[#2e6f73] text-white p-5">
          <h2 className="text-lg font-semibold text-center">Contact info</h2>

          <div className="mt-4 space-y-3">
            <button
              onClick={openCall}
              className="w-full flex items-center gap-4 rounded-xl bg-white/10 active:bg-white/15 px-4 py-4 text-left"
            >
              <IonIcon icon={callOutline} className="text-2xl" />
              <div>
                <div className="font-semibold">{phoneDisplay}</div>
                <div className="text-sm text-white/80">Tap to call</div>
              </div>
            </button>

            <button
              onClick={openEmail}
              className="w-full flex items-center gap-4 rounded-xl bg-white/10 active:bg-white/15 px-4 py-4 text-left"
            >
              <IonIcon icon={mailOutline} className="text-2xl" />
              <div>
                <div className="font-semibold">{email}</div>
                <div className="text-sm text-white/80">Tap to email</div>
              </div>
            </button>

            <button
              onClick={openMaps}
              className="w-full flex items-center gap-4 rounded-xl bg-white/10 active:bg-white/15 px-4 py-4 text-left"
            >
              <IonIcon icon={locationOutline} className="text-2xl" />
              <div>
                <div className="font-semibold">{addressLine1}</div>
                <div className="text-sm text-white/90">{addressLine2}</div>
                <div className="text-sm text-white/80 mt-1">
                  Tap to open Maps
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Send message */}
      <div className="bg-white rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-bold text-gray-900 text-center">
          Send message
        </h2>

        <div className="mt-4">
          <IonList>
            <IonItem>
              <IonLabel position="stacked">
                First name <span className="text-red-500">*</span>
              </IonLabel>
              <IonInput
                value={firstName}
                placeholder="Enter first name"
                onIonInput={(e) => setFirstName(String(e.detail.value ?? ""))}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Last name <span className="text-red-500">*</span>
              </IonLabel>
              <IonInput
                value={lastName}
                placeholder="Enter last name"
                onIonInput={(e) => setLastName(String(e.detail.value ?? ""))}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Email <span className="text-red-500">*</span>
              </IonLabel>
              <IonInput
                value={fromEmail}
                placeholder="Enter email"
                type="email"
                inputMode="email"
                onIonInput={(e) => setFromEmail(String(e.detail.value ?? ""))}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">
                Message <span className="text-red-500">*</span>
              </IonLabel>
              <IonTextarea
                value={message}
                placeholder="Enter message"
                autoGrow
                onIonInput={(e) => setMessage(String(e.detail.value ?? ""))}
              />
            </IonItem>
          </IonList>

          {!canSubmit && (
            <IonNote className="block mt-3 text-gray-500">
              Please fill in all required fields with a valid email.
            </IonNote>
          )}

          <IonButton
            expand="block"
            className="mt-4"
            disabled={!canSubmit}
            onClick={handleSubmit}
            style={
              {
                "--background": "#2e6f73",
                "--color": "#ffffff",
                "--border-radius": "14px",
              } as any
            }
          >
            Send
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
