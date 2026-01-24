import React from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";

const ThePurpose: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <IonAccordionGroup value="purpose">
        <IonAccordion value="purpose">
          <IonItem
            slot="header"
            lines="none"
            className="text-[#2e6f73] font-extrabold tracking-wide"
          >
            <IonLabel className="pl-2">THE PURPOSE</IonLabel>
          </IonItem>
          <div slot="content" className="p-6 pt-1">
            <p className="text-gray-700 leading-relaxed">
              e-DiVA aims to empower carers of people with dementia with an
              iSupport Virtual Assistant. The e-DiVA website allows you to
              interact with other carers, read through educational material,
              locate support and health services and track your appointments. We
              know it is difficult to find the time to go through all the
              information out there, which is why we have collated key functions
              into e-DiVA.
            </p>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default ThePurpose;
