import React from "react";
import { IonButton, IonSearchbar } from "@ionic/react";

interface HomePageProps {
  onNavigate: (tab: "contactUs" | "chat") => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome card */}
      <div className="bg-[#2e6f73] rounded-2xl p-6 text-white shadow-md text-center">
        <h2 className="text-3xl font-bold mb-2">
          Dementia Carers Supporting Assistant
        </h2>
      </div>

      {/* Keyword search bar */}
      <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
        <IonSearchbar
          placeholder="Search videos, articles, resources..."
          className="custom-searchbar"
          style={{
            "--background": "transparent",
            "--box-shadow": "none",
            padding: "0",
          }}
        />
      </div>

      {/* Introduction message */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Welcome to e-DiVA</h2>

        <p className="text-gray-700 leading-relaxed">
          Are you currently providing care for someone with dementia? Caring for
          someone with dementia can be both rewarding and challenging. e-DiVA is
          here to support you with a smart, easy-to-use Virtual Assistant
          designed to help you manage the responsibilities of caregiving.
        </p>

        <p className="text-gray-700 leading-relaxed">
          e-DiVA seeks to improve caregiver well-being by offering access to
          educational content and caring information. It aims to educate,
          provide skills, and offer support to carers.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Whether you are looking for practical advice, emotional support, or
          tools to manage daily care, e-DiVA offers:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">On-demand guidance</span> through
            voice or text search
          </li>
          <li>
            <span className="font-semibold">Culturally tailored resources</span>{" "}
            in multiple languages
          </li>
          <li>
            <span className="font-semibold">Video tutorials</span> to help with
            everyday caregiving tasks
          </li>
          <li>
            <span className="font-semibold">Tips and strategies</span> to reduce
            stress and improve well-being
          </li>
        </ul>
      </div>

      {/* Login/Create account button */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <div className="min-w-0 flex-1">
            <div className="inline-block whitespace-nowrap">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight">
                Become a member
              </h3>
              <div className="mt-2 h-2 rounded bg-[#d8b06a]" />
            </div>
          </div>

          {/* Right */}
          <IonButton
            onClick={() => onNavigate("chat")}
            className="shrink-0"
            style={
              {
                "--background": "#2e6f73",
                "--color": "#ffffff",
                "--border-radius": "0px",

                /* responsive sizing without hard pixels */
                "--padding-start": "1.5rem",
                "--padding-end": "1.5rem",
                "--padding-top": "0.9rem",
                "--padding-bottom": "0.9rem",
                fontSize: "1rem",
              } as any
            }
          >
            Join now
          </IonButton>
        </div>
      </div>

      {/* Contact us */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">Contact us</h2>

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

export default HomePage;
