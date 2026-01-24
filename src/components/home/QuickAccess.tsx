import React from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";
import Button from "../universe/Button";

interface QuickAccessProps {
  onNavigate: (tab: "aboutUs" | "manual") => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <IonAccordionGroup value="quick-access">
        <IonAccordion value="quick-access">
          <IonItem
            slot="header"
            lines="none"
            className="text-[#2e6f73] font-extrabold tracking-wide uppercase"
          >
            <IonLabel>Quick Access</IonLabel>
          </IonItem>
          <div slot="content" className="p-6 pt-1">
            <div className="grid grid-cols-1 gap-3">
              <Button
                text="iSupport Course"
                onClick={() => console.log("Go to iSupport")}
              />
              <Button
                text="Educational Videos"
                onClick={() => console.log("Go to Videos")}
              />
              <Button
                text="Dementia News"
                onClick={() => console.log("Go to News")}
              />
              <Button
                text="Local Support Services"
                onClick={() => console.log("Go to Services")}
              />
              <Button text="About Us" onClick={() => onNavigate("aboutUs")} />
              <Button text="User Guide" onClick={() => onNavigate("manual")} />
            </div>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default QuickAccess;
