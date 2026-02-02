import React, { useMemo } from "react";
import { ManualDetailId } from "../subPages/ManualDetailPage";
import TopBar from "../components/universal/TopBar";
import TitleButton from "../components/universal/TitleButton";

interface ManualPageProps {
  onNavigate: (tab: "manualDetail", sectionId: ManualDetailId) => void;
}

const ManualPage: React.FC<ManualPageProps> = ({ onNavigate }) => {
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
      <TopBar title="User Manual" />
      {/* Section cards */}
      {sections.map((s) => (
        <TitleButton
          key={s.id}
          onClick={() => onNavigate("manualDetail", s.id)}
          title={`${s.number}. ${s.title}`}
          text="Tap to view instructions."
        />
      ))}
    </div>
  );
};

export default ManualPage;
