import React, { useState } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonIcon,
} from "@ionic/react";
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
} from "ionicons/icons";
import HomeView from "./pages/HomeView";
import VideoLibrary from "./pages/VideoLibrary";
import SearchView from "./pages/SearchView";
import ForYouView from "./pages/ForYouView";
import ChatAssistant from "./pages/ChatAssistant";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "home" | "videos" | "search" | "foryou" | "chat"
  >("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView onNavigate={(tab: any) => setActiveTab(tab)} />;
      case "videos":
        return <VideoLibrary />;
      case "search":
        return <SearchView />;
      case "foryou":
        return <ForYouView />;
      case "chat":
        return <ChatAssistant />;
      default:
        return <HomeView onNavigate={(tab: any) => setActiveTab(tab)} />;
    }
  };

  return (
    <IonApp>
      <IonHeader className="ion-no-border">
        <IonToolbar color="primary" className="px-2">
          <IonTitle className="ion-no-padding font-bold text-lg">
            e-DiVA Assistant
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="pb-24">{renderContent()}</div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <div className="flex justify-around items-center bg-white border-t border-gray-100 py-3 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
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
