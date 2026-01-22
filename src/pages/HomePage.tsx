import React from "react";
import ContactUs from "../components/aboutUs/ContactUs";
import Introduction from "../components/home/Introduction";
import Login from "../components/home/Login";
import QuickAccess from "../components/home/QuickAccess";
import SearchBar from "../components/home/SearchBar";
import WelcomeCard from "../components/home/WelcomeCard";

interface HomePageProps {
  onNavigate: (tab: "aboutUs" | "manual" | "contactUs" | "profile") => void;
  isLoggedIn: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, isLoggedIn }) => {
  return (
    <div className="p-4 space-y-6">
      <WelcomeCard />
      <SearchBar />
      <Introduction isLoggedIn={isLoggedIn} />
      {/* Logged in state */}
      {isLoggedIn && (
        <>
          <QuickAccess onNavigate={onNavigate} />
          <ContactUs onNavigate={onNavigate} />
        </>
      )}
      {/* Logged out state */}
      {!isLoggedIn && <Login onNavigate={onNavigate} />}
    </div>
  );
};

export default HomePage;
