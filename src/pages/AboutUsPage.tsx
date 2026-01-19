import React from "react";
import { IonButton } from "@ionic/react";

interface AboutUsPageProps {
  onNavigate: (tab: "contactUs" | "team") => void;
}

const AboutUs: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900">About Us</div>
        <div className="w-[56px]" />
      </div>

      {/* Image */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src="Carers.png"
          alt="Carer supporting an older adult"
          className="w-full h-56 object-cover"
        />
      </div>

      {/* THE PURPOSE */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
        <div className="text-[#2e6f73] font-extrabold tracking-wide">
          THE PURPOSE
        </div>
        <p className="text-gray-700 leading-relaxed">
          e-DiVA aims to empower carers of people with dementia with an iSupport
          Virtual Assistant. The e-DiVA website allows you to interact with
          other carers, read through educational material, locate support and
          health services and track your appointments. We know it is difficult
          to find the time to go through all the information out there, which is
          why we have collated key functions into e-DiVA.
        </p>
      </div>

      {/* THE PROJECT */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="text-[#2e6f73] font-extrabold tracking-wide">
          THE PROJECT
        </div>
        <p className="text-gray-700 leading-relaxed">
          Starting in 2021, this project culturally and contextually adapts the
          iSupport for dementia programme, that was developed by The World
          Health Organization (WHO), to fit the healthcare systems in Australia,
          Indonesia, New Zealand, and Vietnam.
        </p>
        <p className="text-gray-700 leading-relaxed">
          To help carers of people with dementia, e-DiVA has implemented the
          following key functions:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">iSupport online course</span> and{" "}
            <span className="font-semibold">Videos</span> to improve caring
            skills and knowledge
          </li>
          <li>
            <span className="font-semibold">Diary</span> to keep everything
            organised
          </li>
          <li>
            <span className="font-semibold">Peer support</span> to connect with
            other carers
          </li>
          <li>
            <span className="font-semibold">Voice search</span>
          </li>
          <li>
            <span className="font-semibold">Recommended content</span> tailored
            based on your caring needs assessment
          </li>
          <li>
            <span className="font-semibold">
              Available dementia care services
            </span>{" "}
            in your area
          </li>
        </ul>
      </div>

      {/* THE TEAM */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
        <div className="text-[#2e6f73] font-extrabold tracking-wide">
          THE TEAM
        </div>
        <p className="text-gray-700 leading-relaxed">
          If you would like to read more about our team members, please see the
          Research Team page.
        </p>
        <IonButton
          expand="block"
          onClick={() => onNavigate("team")}
          style={
            {
              "--background": "#2e6f73",
              "--color": "#ffffff",
              "--border-radius": "0px",
              "--padding-top": "0.9rem",
              "--padding-bottom": "0.9rem",
              fontSize: "1rem",
            } as any
          }
        >
          View Research Team
        </IonButton>
      </div>

      {/* Contact us */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
        <h2 className="text-2xl font-bold text-[#2e6f73]">CONTACT US</h2>
        <p className="text-gray-700 leading-relaxed">
          Need help or more information? You can call, email, or send us a
          message.
        </p>
        <IonButton
          expand="block"
          onClick={() => onNavigate("contactUs")}
          style={
            {
              "--background": "#2e6f73",
              "--color": "#ffffff",
              "--border-radius": "0px",
            } as any
          }
        >
          Contact us
        </IonButton>
      </div>
    </div>
  );
};

export default AboutUs;
