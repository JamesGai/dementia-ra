import React, { useEffect, useRef, useState } from "react";
import { IonApp, IonContent, IonFooter, IonIcon } from "@ionic/react";
import {
  home,
  homeOutline,
  informationCircle,
  informationCircleOutline,
  library,
  libraryOutline,
  person,
  personOutline,
  videocam,
  videocamOutline,
} from "ionicons/icons";
// Main pages
import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";
import ManualPage from "./pages/ManualPage";
import ProfilePage from "./pages/ProfilePage";
import VideoPage, { VideoItem } from "./pages/VideoPage";
// Sub pages
import ContactUsPage from "./subPages/ContactUsPage";
import CreateAccountPage from "./subPages/CreateAccountPage";
import ForgotPasswordPage from "./subPages/ForgotPasswordPage";
import ManualDetailPage, { ManualDetailId } from "./subPages/ManualDetailPage";
import TeamPage from "./subPages/TeamPage";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | "aboutUs"
    | "contactUs"
    | "createAccount"
    | "forgotPassword"
    | "home"
    | "manual"
    | "manualDetail"
    | "profile"
    | "team"
    | "video"
  >("home");

  const [activeManualDetail, setActiveManualDetail] =
    useState<ManualDetailId | null>(null);
  const [videoHistory, setVideoHistory] = useState<VideoItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "aboutUs":
        return <AboutUsPage onNavigate={(tab: any) => setActiveTab(tab)} />;
      case "contactUs":
        return <ContactUsPage onBack={() => setActiveTab("aboutUs")} />;
      case "createAccount":
        return <CreateAccountPage onBack={() => setActiveTab("profile")} />;
      case "forgotPassword":
        return <ForgotPasswordPage onBack={() => setActiveTab("profile")} />;
      case "home":
        return (
          <HomePage
            onNavigate={(tab: any) => setActiveTab(tab)}
            isLoggedIn={isLoggedIn}
          />
        );
      case "manual":
        return (
          <ManualPage
            onNavigate={(tab, sectionId) => {
              setActiveManualDetail(sectionId);
              setActiveTab(tab);
            }}
          />
        );
      case "manualDetail":
        return (
          <ManualDetailPage
            onBack={() => setActiveTab("manual")}
            sectionId={activeManualDetail!}
          />
        );
      case "profile":
        return (
          <ProfilePage
            onNavigate={(tab: any) => setActiveTab(tab)}
            isLoggedIn={isLoggedIn}
            onLogin={() => {
              setIsLoggedIn(true);
              console.log("Successfully logged in");
              setActiveTab("home");
            }}
            onLogout={() => {
              setIsLoggedIn(false);
              console.log("Successfully logged out");
              setActiveTab("home");
            }}
          />
        );
      case "team":
        return <TeamPage onBack={() => setActiveTab("aboutUs")} />;
      case "video":
        return (
          <VideoPage
            addToVideoHistory={(video: VideoItem) => addToVideoHistory(video)}
            historyVideos={videoHistory}
            scrollToTop={scrollToTop}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={(tab: any) => setActiveTab(tab)}
            isLoggedIn={isLoggedIn}
          />
        );
    }
  };

  const addToVideoHistory = (video: VideoItem) => {
    setVideoHistory((prev) => {
      const filtered = prev.filter((v) => v.id !== video.id);
      return [video, ...filtered];
    });
  };

  const scrollToTop = () => {
    contentRef.current?.scrollToTop(0);
  };

  useEffect(() => {
    scrollToTop();
  }, [activeTab]);

  return (
    <IonApp>
      {/* Main content/page */}
      <IonContent ref={contentRef}>
        <div className="pb-24">{renderContent()}</div>
      </IonContent>
      {/* Footer */}
      <IonFooter className="ion-no-border">
        <div className="flex justify-around items-center bg-white border-t border-gray-100 py-3 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {/* About Us (logged out) */}
          {!isLoggedIn && (
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
          )}
          {/* Home */}
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
          {/* Manual (logged out) */}
          {!isLoggedIn && (
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                activeTab === "manual" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <IonIcon
                icon={activeTab === "manual" ? library : libraryOutline}
                className="text-2xl mb-1"
              />
              <span className="text-[10px] font-medium">Manual</span>
              {activeTab === "manual" && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
              )}
            </button>
          )}
          {/* Profile */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activeTab === "profile" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={activeTab === "profile" ? person : personOutline}
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Profile</span>
            {activeTab === "profile" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>
          {/* Videos (logged in) */}
          {isLoggedIn && (
            <button
              onClick={() => setActiveTab("video")}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                activeTab === "video" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <IonIcon
                icon={activeTab === "video" ? videocam : videocamOutline}
                className="text-2xl mb-1"
              />
              <span className="text-[10px] font-medium">Videos</span>
              {activeTab === "video" && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
              )}
            </button>
          )}
        </div>
      </IonFooter>
    </IonApp>
  );
};

export default App;
