import React from "react";
import Button from "../universe/Button";

interface ContactUsProps {
  onNavigate: (tab: "contactUs") => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-3">
      <div className="text-[#2e6f73] font-extrabold tracking-wide">
        CONTACT US
      </div>
      <p className="text-gray-700 leading-relaxed">
        Need help or more information? You can call, email, or send us a
        message.
      </p>
      <Button text="Contact us" onClick={() => onNavigate("contactUs")} />
    </div>
  );
};

export default ContactUs;
