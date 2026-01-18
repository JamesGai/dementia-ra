import React, { useEffect, useRef, useState } from "react";
import { IonApp, IonContent, IonFooter, IonIcon } from "@ionic/react";
import {
  homeOutline,
  videocamOutline,
  searchOutline,
  heartOutline,
  chatbubbleEllipsesOutline,
  home,
  videocam,
  search,
  heart,
  chatbubbleEllipses,
  informationCircle,
  informationCircleOutline,
} from "ionicons/icons";
import HomePage from "./pages/HomePage";
import ContactUsPage from "./components/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import VideoLibrary from "./pages/VideoLibrary";
import SearchView from "./pages/SearchView";
import ForYouView from "./pages/ForYouView";
import ChatAssistant from "./pages/ChatAssistant";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "home" | "aboutUs" | "videos" | "search" | "foryou" | "chat" | "contactUs"
  >("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={(tab: any) => setActiveTab(tab)} />;
      case "contactUs":
        return <ContactUsPage onBack={() => setActiveTab("aboutUs")} />;
      case "aboutUs":
        return <AboutUsPage onNavigate={(tab: any) => setActiveTab(tab)} />;
      case "videos":
        return <VideoLibrary />;
      case "search":
        return <SearchView />;
      case "foryou":
        return <ForYouView />;
      case "chat":
        return <ChatAssistant />;
      default:
        return <HomePage onNavigate={(tab: any) => setActiveTab(tab)} />;
    }
  };

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  useEffect(() => {
    // reset scroll whenever you switch pages
    contentRef.current?.scrollToTop(0);
  }, [activeTab]);

  return (
    <IonApp>
      <IonContent ref={contentRef}>
        <div className="pb-24">{renderContent()}</div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div className="flex justify-around items-center bg-white border-t border-gray-100 py-3 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {/* Home Page */}
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === "home" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={activeTab === "home" ? home : homeOutline}
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Home</span>
            {activeTab === "home" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>

          {/* About Us Page */}
          <button
            onClick={() => setActiveTab("aboutUs")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === "aboutUs" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={
                activeTab === "aboutUs"
                  ? informationCircle
                  : informationCircleOutline
              }
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">About Us</span>
            {activeTab === "aboutUs" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>

          {/* Video Page */}
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === "videos" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={activeTab === "videos" ? videocam : videocamOutline}
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Videos</span>
            {activeTab === "videos" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>

          {/* Search Page */}
          <button
            onClick={() => setActiveTab("search")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === "search" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={activeTab === "search" ? search : searchOutline}
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Search</span>
            {activeTab === "search" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>

          {/* Favourite Page */}
          <button
            onClick={() => setActiveTab("foryou")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === "foryou" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={activeTab === "foryou" ? heart : heartOutline}
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">For You</span>
            {activeTab === "foryou" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>

          {/* Chatbot Page */}
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === "chat" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={
                activeTab === "chat"
                  ? chatbubbleEllipses
                  : chatbubbleEllipsesOutline
              }
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Chat</span>
            {activeTab === "chat" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>
        </div>
      </IonFooter>
    </IonApp>
  );
};

export default App;
