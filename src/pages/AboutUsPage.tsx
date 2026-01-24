import React from "react";
import ContactUs from "../components/aboutUs/ContactUs";
import TheTeam from "../components/aboutUs/TheTeam";
import TheProject from "../components/aboutUs/TheProject";
import ThePurpose from "../components/aboutUs/ThePurpose";
import TopBar from "../components/universe/TopBar";

interface AboutUsPageProps {
  onNavigate: (tab: "contactUs" | "team") => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 space-y-6">
      <TopBar title="About Us" />
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src="Carers.png"
          alt="Carer supporting an older adult"
          className="w-full h-56 object-cover"
        />
      </div>
      <ThePurpose />
      <TheProject />
      <TheTeam onNavigate={onNavigate} />
      <ContactUs onNavigate={onNavigate} />
    </div>
  );
};

export default AboutUsPage;
