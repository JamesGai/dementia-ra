import React from "react";
import { searchOutline } from "ionicons/icons";
import BecomeMember from "../components/home/BecomeMember";
import ChatbotButton from "../components/home/ChatbotButton";
import Introduction from "../components/home/Introduction";
import QuickAccess from "../components/home/QuickAccess";
import InputBar from "../components/universal/InputBar";
import Welcome from "../components/home/Welcome";

interface HomePageProps {
  onNavigate: (
    tab:
      | "aboutUs"
      | "chatbot"
      | "course"
      | "manual"
      | "profile"
      | "search"
      | "service"
      | "video",
  ) => void;
  isLoggedIn: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, isLoggedIn }) => {
  return (
    <div className="space-y-6 p-4 pt-15">
      <Welcome />
      <InputBar
        placeholder="Search resources..."
        leftIcon={searchOutline}
        onFocus={() => onNavigate("search")}
        onSubmit={() => onNavigate("search")}
        onVoiceInput={() => onNavigate("search")}
        isVoiceSupported={true}
      />
      <ChatbotButton onNavigate={onNavigate} />
      <Introduction isLoggedIn={isLoggedIn} />
      {/* Logged in state */}
      {isLoggedIn && <QuickAccess onNavigate={onNavigate} />}
      {/* Logged out state */}
      {!isLoggedIn && <BecomeMember onNavigate={onNavigate} />}
    </div>
  );
};

export default HomePage;
