import React from "react";
import {
  informationCircle,
  library,
  map,
  school,
  videocam,
} from "ionicons/icons";
import AccordionCard from "../universal/AccordionCard";
import TitleButton from "../universal/TitleButton";
import { IonIcon } from "@ionic/react";

interface QuickAccessProps {
  onNavigate: (tab: "aboutUs" | "manual") => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate }) => {
  return (
    <AccordionCard title="Quick Access">
      <div className="grid grid-cols-1 gap-3">
        <TitleButton
          title={
            <div className="flex items-center gap-6">
              <IonIcon icon={school} className="text-2xl" />
              <span>iSupport Course</span>
            </div>
          }
          onClick={() => console.log("Go to iSupport")}
        />
        <TitleButton
          title={
            <div className="flex items-center gap-6">
              <IonIcon icon={videocam} className="text-2xl" />
              <span>Educational Videos</span>
            </div>
          }
          onClick={() => console.log("Go to videos")}
        />
        <TitleButton
          title={
            <div className="flex items-center gap-6">
              <IonIcon icon={map} className="text-2xl" />
              <span>Local Support Services</span>
            </div>
          }
          onClick={() => console.log("Go to services")}
        />
        <TitleButton
          title={
            <div className="flex items-center gap-6">
              <IonIcon icon={informationCircle} className="text-2xl" />
              <span>About Us</span>
            </div>
          }
          onClick={() => onNavigate("aboutUs")}
        />
        <TitleButton
          title={
            <div className="flex items-center gap-6">
              <IonIcon icon={library} className="text-2xl" />
              <span>User Guide</span>
            </div>
          }
          onClick={() => onNavigate("manual")}
        />
      </div>
    </AccordionCard>
  );
};

export default QuickAccess;
