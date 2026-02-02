import React, { useState } from "react";
import ContactUs from "../components/aboutUs/ContactUs";
import TheTeam from "../components/aboutUs/TheTeam";
import TheProject from "../components/aboutUs/TheProject";
import ThePurpose from "../components/aboutUs/ThePurpose";
import ContactUsModal from "../components/aboutUs/ContactUsModal";
import TeamModal from "../components/aboutUs/TeamModal";

const AboutUsPage: React.FC = () => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openTeamModal = (_tab: "team") => setIsTeamOpen(true);
  const closeTeamModal = () => setIsTeamOpen(false);
  const openContactModal = (_tab: "contactUs") => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src="Carers.png"
          alt="Carer supporting an older adult"
          className="w-full h-56 object-cover"
        />
      </div>
      <ThePurpose />
      <TheProject />
      <TheTeam onNavigate={openTeamModal} />
      <ContactUs onNavigate={openContactModal} />
      <TeamModal isOpen={isTeamOpen} onClose={closeTeamModal} />
      <ContactUsModal isOpen={isContactOpen} onClose={closeContactModal} />
    </div>
  );
};

export default AboutUsPage;
