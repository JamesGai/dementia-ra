import React from "react";
import BecomeMember from "../components/home/BecomeMember";
import ChatbotButton from "../components/home/ChatbotButton";
import Introduction from "../components/home/Introduction";
import QuickAccess from "../components/home/QuickAccess";
import SearchBar from "../components/home/SearchBar";
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
    <div className="p-4 space-y-6">
      <Welcome />
      <SearchBar onActivate={() => onNavigate("search")} />
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
