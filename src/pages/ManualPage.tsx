import React, { useMemo, useState } from "react";
import TitleButton from "../components/universal/TitleButton";
import ManualModal, { ManualDetailId } from "../components/manual/manualModal";

const ManualPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<
    ManualDetailId | undefined
  >(undefined);
  const sections = useMemo(
    () => [
      { id: "login" as const, number: "1", title: "Log-in" },
      { id: "profile" as const, number: "2", title: "Update your profile" },
      { id: "search" as const, number: "3", title: "Search e-DiVA content" },
      { id: "course" as const, number: "4", title: "Online Course" },
      { id: "diary" as const, number: "5", title: "Diary" },
      { id: "peer" as const, number: "6", title: "Peer-Support" },
      { id: "videos" as const, number: "7", title: "Video/Animations" },
      { id: "services" as const, number: "8", title: "Dementia Services" },
      { id: "chatbot" as const, number: "9", title: "Chatbot" },
    ],
    [],
  );

  return (
    <div className="p-4 space-y-6">
      {/* Section cards */}
      {sections.map((s) => (
        <TitleButton
          key={s.id}
          onClick={() => {
            setActiveSectionId(s.id);
            setIsModalOpen(true);
          }}
          title={`${s.number}. ${s.title}`}
          text="Tap to view instructions."
        />
      ))}
      <ManualModal
        isOpen={isModalOpen}
        sectionId={activeSectionId}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ManualPage;
