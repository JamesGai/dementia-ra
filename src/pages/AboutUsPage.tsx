import React from "react";
import ContactUs from "../components/aboutUs/ContactUs";
import Image from "../components/aboutUs/Image";
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
      <Image />
      <ThePurpose />
      <TheProject />
      <TheTeam onNavigate={onNavigate} />
      <ContactUs onNavigate={onNavigate} />
    </div>
  );
};

export default AboutUsPage;
