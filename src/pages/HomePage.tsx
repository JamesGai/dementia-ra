import React from "react";
import Introduction from "../components/home/Introduction";
import Login from "../components/home/Login";
import QuickAccess from "../components/home/QuickAccess";
import SearchBar from "../components/home/SearchBar";
import WelcomeCard from "../components/home/WelcomeCard";

interface HomePageProps {
  onNavigate: (tab: "profile") => void;
  isLoggedIn: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, isLoggedIn }) => {
  return (
    <div className="p-4 space-y-6">
      <WelcomeCard />
      <SearchBar />
      <Introduction isLoggedIn={isLoggedIn} />
      {/* Logged in state */}
      {isLoggedIn && <QuickAccess />}
      <Login onJoin={() => onNavigate("profile")} />
    </div>
  );
};

export default HomePage;
