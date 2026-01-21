import React from "react";
import Introduction from "../components/home/Introduction";
import Login from "../components/home/Login";
import SearchBar from "../components/home/SearchBar";
import WelcomeCard from "../components/home/WelcomeCard";

interface HomePageProps {
  onNavigate: (tab: "profile") => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 space-y-6">
      <WelcomeCard />
      <SearchBar />
      <Introduction />
      <Login onJoin={() => onNavigate("profile")} />
    </div>
  );
};

export default HomePage;
