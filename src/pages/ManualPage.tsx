import React, { useMemo, useState } from "react";
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
} from "@ionic/react";
import { menuOutline } from "ionicons/icons";

type ManualSectionId =
  | "login"
  | "profile"
  | "search"
  | "course"
  | "diary"
  | "peer"
  | "videos"
  | "services"
  | "chatbot";

const ManualPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ManualSectionId>("login");

  const sections = useMemo(
    () => [
      { id: "login" as const, label: "1. Log-in" },
      { id: "profile" as const, label: "2. Update your profile" },
      { id: "search" as const, label: "3. Search e-DiVA content" },
      { id: "course" as const, label: "4. Online Course" },
      { id: "diary" as const, label: "5. Diary" },
      { id: "peer" as const, label: "6. Peer-Support" },
      { id: "videos" as const, label: "7. Video/Animations" },
      { id: "services" as const, label: "8. Dementia Services" },
      { id: "chatbot" as const, label: "9. Chatbot" },
    ],
    [],
  );

  const scrollToSection = async (id: ManualSectionId) => {
    setActiveSection(id);

    const menuEl = document.querySelector("ion-menu") as any;
    await menuEl?.close?.();

    const el = document.getElementById(`section-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Menu drawer */}
      <IonMenu contentId="manual-content" side="start" type="overlay">
        <div className="p-4">
          <div className="text-lg font-extrabold text-gray-900 mb-3">
            Content
          </div>
          <IonList>
            {sections.map((s) => (
              <IonItem
                key={s.id}
                button
                detail={false}
                onClick={() => scrollToSection(s.id)}
              >
                <IonLabel
                  className={
                    activeSection === s.id
                      ? "font-semibold text-[#2e6f73]"
                      : "text-gray-800"
                  }
                >
                  {s.label}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonMenu>

      {/* Main Content */}
      <div id="manual-content" className="p-4 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between ">
          <IonMenuButton autoHide={false}>
            <IonButton
              size="large"
              style={{ "--background": "#2e6f73" } as any}
            >
              <IonIcon icon={menuOutline} slot="icon-only" />
            </IonButton>
          </IonMenuButton>
          <div className="text-lg font-bold text-gray-900">User Manual</div>
        </div>

        {/* Section cards */}
        <div
          id="section-login"
          className="bg-white rounded-2xl p-6 shadow-md space-y-3"
        >
          <div className="text-[#2e6f73] font-extrabold tracking-wide">
            1. LOG-IN
          </div>
          <p className="text-gray-700 leading-relaxed">
            Add your Log-in instructions here...
          </p>
        </div>

        <div
          id="section-profile"
          className="bg-white rounded-2xl p-6 shadow-md space-y-3"
        >
          <div className="text-[#2e6f73] font-extrabold tracking-wide">
            2. UPDATE YOUR PROFILE
          </div>
          <p className="text-gray-700 leading-relaxed">
            Add your profile instructions here...
          </p>
        </div>

        <div
          id="section-search"
          className="bg-white rounded-2xl p-6 shadow-md space-y-3"
        >
          <div className="text-[#2e6f73] font-extrabold tracking-wide">
            3. SEARCH E-DIVA CONTENT
          </div>
          <p className="text-gray-700 leading-relaxed">
            Add your search instructions here...
          </p>
        </div>

        {/* Add more cards using the same pattern:
            section-course, section-diary, section-peer, section-videos,
            section-services, section-chatbot
        */}
      </div>
    </>
  );
};

export default ManualPage;
