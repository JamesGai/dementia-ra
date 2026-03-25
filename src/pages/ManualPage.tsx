import React, { useMemo, useState } from "react";
import { Capacitor } from "@capacitor/core";
import TitleButton from "../components/universal/TitleButton";
import ManualModal from "../components/manual/manualModal";

export type ManualSection =
  | "login"
  | "profile"
  | "search"
  | "course"
  | "diary"
  | "peer"
  | "videos"
  | "service"
  | "chatbot";

const ManualPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ManualSection | undefined>(
    undefined,
  );
  const sections = useMemo(
    () => [
      { id: "login" as const, number: "1", title: "Log-in" },
      { id: "profile" as const, number: "2", title: "Update your profile" },
      { id: "search" as const, number: "3", title: "Search e-DiVA content" },
      { id: "course" as const, number: "4", title: "Online Course" },
      { id: "diary" as const, number: "5", title: "Diary" },
      { id: "peer" as const, number: "6", title: "Peer-Support" },
      { id: "videos" as const, number: "7", title: "Video/Animations" },
      { id: "service" as const, number: "8", title: "Dementia Services" },
      { id: "chatbot" as const, number: "9", title: "Chatbot" },
    ],
    [],
  );

  return (
    <div
      className={`space-y-6 p-4 ${Capacitor.isNativePlatform() ? "pt-15" : ""}`}
    >
      {/* Section cards */}
      {sections.map((s) => (
        <TitleButton
          key={s.id}
          onClick={() => {
            setActiveSection(s.id);
            setIsModalOpen(true);
          }}
          title={`${s.number}. ${s.title}`}
          text="Tap to view instructions."
        />
      ))}
      <ManualModal
        isOpen={isModalOpen}
        section={activeSection}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ManualPage;
