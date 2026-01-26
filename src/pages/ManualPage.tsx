import React, { useMemo } from "react";
import { ManualDetailId } from "../subPages/ManualDetailPage";
import TopBar from "../components/universal/TopBar";

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
        <button
          key={s.id}
          onClick={() => onNavigate("manualDetail", s.id)}
          className="w-full text-left rounded-2xl shadow-md active:opacity-90"
        >
          <div className="px-8 py-7 space-y-3 bg-[#2e6f73]">
            <div className="text-white font-extrabold tracking-wide uppercase">
              {s.number}. {s.title}
            </div>
            <p className="text-white leading-relaxed">
              Tap to view instructions.
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ManualPage;
