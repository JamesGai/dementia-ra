import React from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";

interface AccordionCardProps {
  title: string;
  children: React.ReactNode;
}

const AccordionCard: React.FC<AccordionCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <IonAccordionGroup>
        <IonAccordion value="item">
          <IonItem
            slot="header"
            lines="none"
            className="text-[#2e6f73] font-extrabold tracking-wide uppercase"
          >
            <IonLabel className="pl-2">{title}</IonLabel>
          </IonItem>
          <div slot="content" className="p-6 pt-1">
            {children}
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default AccordionCard;
