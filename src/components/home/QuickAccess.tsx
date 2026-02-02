import React from "react";
import { IonIcon } from "@ionic/react";
import {
  informationCircle,
  library,
  map,
  school,
  videocam,
} from "ionicons/icons";
import AccordionCard from "../universal/AccordionCard";
import TitleButton from "../universal/TitleButton";

interface QuickAccessProps {
  onNavigate: (
    tab: "aboutUs" | "course" | "manual" | "service" | "video",
  ) => void;
}

type QuickAccessItem = {
  key: string;
  label: string;
  icon: string;
  tab: "aboutUs" | "course" | "manual" | "service" | "video";
};

const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate }) => {
  const items: QuickAccessItem[] = [
    {
      key: "course",
      label: "iSupport Course",
      icon: school,
      tab: "course",
    },
    {
      key: "videos",
      label: "Educational Videos",
      icon: videocam,
      tab: "video",
    },
    {
      key: "service",
      label: "Local Support Services",
      icon: map,
      tab: "service",
    },
    {
      key: "about",
      label: "About Us",
      icon: informationCircle,
      tab: "aboutUs",
    },
    { key: "manual", label: "User Guide", icon: library, tab: "manual" },
  ];

  return (
    <AccordionCard title="Quick Access">
      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <TitleButton
            key={item.key}
            title={
              <div className="flex items-center gap-6">
                <IonIcon icon={item.icon} className="text-2xl" />
                <span>{item.label}</span>
              </div>
            }
            onClick={() => onNavigate(item.tab)}
          />
        ))}
      </div>
    </AccordionCard>
  );
};

export default QuickAccess;
