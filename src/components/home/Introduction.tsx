import React from "react";
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from "@ionic/react";

interface IntroductionProps {
  isLoggedIn: boolean;
}

const Introduction: React.FC<IntroductionProps> = ({ isLoggedIn }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <IonAccordionGroup value="intro">
        <IonAccordion value="intro">
          <IonItem
            slot="header"
            lines="none"
            className="text-[#2e6f73] font-extrabold tracking-wide"
          >
            <IonLabel>WELCOME TO E-DIVA</IonLabel>
          </IonItem>
          <div slot="content" className="p-6 pt-1">
            {/* Logged out state */}
            {!isLoggedIn && (
              <>
                <p className="text-gray-700 leading-relaxed">
                  Are you currently providing care for someone with dementia?
                  Caring for someone with dementia can be both rewarding and
                  challenging. e-DiVA is here to support you with a smart,
                  easy-to-use Virtual Assistant designed to help you manage the
                  responsibilities of caregiving.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  e-DiVA seeks to improve caregiver well-being by offering
                  access to educational content and caring information. It aims
                  to educate, provide skills, and offer support to carers.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you are looking for practical advice, emotional
                  support, or tools to manage daily care, e-DiVA offers:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <span className="font-semibold">On-demand guidance</span>{" "}
                    through voice or text search
                  </li>
                  <li>
                    <span className="font-semibold">
                      Culturally tailored resources
                    </span>{" "}
                    in multiple languages
                  </li>
                  <li>
                    <span className="font-semibold">Video tutorials</span> to
                    help with everyday caregiving tasks
                  </li>
                  <li>
                    <span className="font-semibold">Tips and strategies</span>{" "}
                    to reduce stress and improve well-being
                  </li>
                </ul>
              </>
            )}
            {/* Logged in state */}
            {isLoggedIn && (
              <div className="space-y-6">
                {/* Intro text */}
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    e-DiVA is a platform that provides resources to support
                    people who care for a loved one living with dementia (also
                    known as carers or care partners).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Here you can access the{" "}
                    <span className="font-semibold text-[#2e6f73]">
                      iSupport course
                    </span>
                    , watch{" "}
                    <span className="font-semibold text-[#2e6f73]">
                      educational videos
                    </span>
                    , stay up to date with{" "}
                    <span className="font-semibold text-[#2e6f73]">
                      dementia-related news
                    </span>
                    , and find{" "}
                    <span className="font-semibold text-[#2e6f73]">
                      local support services
                    </span>
                    .
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You will also find instructional videos throughout the app
                    to help you navigate its features. You can refer to the{" "}
                    <span className="font-semibold text-[#2e6f73]">
                      e-DiVA user guide
                    </span>{" "}
                    at any time for additional support.
                  </p>
                </div>
              </div>
            )}
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default Introduction;
