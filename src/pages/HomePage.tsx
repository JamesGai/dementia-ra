import React from "react";
import { searchVideos } from "../services/videoService";
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
      | "service"
      | "video",
  ) => void;
  isLoggedIn: boolean;
}

const handleSearch = async (value: string) => {
  if (!value.trim()) return;
  const results = await searchVideos(value);
  console.log("Search term:", value);
  console.log("Search results:", results);
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate, isLoggedIn }) => {
  return (
    <div className="p-4 space-y-6">
      <Welcome />
      <SearchBar onSearch={handleSearch} />
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
