import React from "react";

export type ManualSectionId =
  | "login"
  | "profile"
  | "search"
  | "course"
  | "diary"
  | "peer"
  | "videos"
  | "services"
  | "chatbot";

const SECTION_TITLES: Record<ManualSectionId, string> = {
  login: "Log-in",
  profile: "Update your profile",
  search: "Search e-DiVA content",
  course: "Online Course",
  diary: "Diary",
  peer: "Peer-Support",
  videos: "Video/Animations",
  services: "Dementia Services",
  chatbot: "Chatbot",
};

interface ManualSectionPageProps {
  onBack: () => void;
  sectionId: ManualSectionId;
}

const ManualSectionPage: React.FC<ManualSectionPageProps> = ({
  onBack,
  sectionId,
}) => {
  const title = SECTION_TITLES[sectionId];

  return (
    <div className="p-4 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-[#2e6f73] font-semibold">
          ← Back
        </button>
      </div>
      {/* Instruction content */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
        <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
          {title}
        </div>
        <p className="text-gray-700 leading-relaxed">
          Add the instructions for{" "}
          <span className="font-semibold">{title}</span> here.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Step 1: ...</li>
          <li>Step 2: ...</li>
          <li>Step 3: ...</li>
        </ul>
      </div>
    </div>
  );
};

export default ManualSectionPage;
