import React, { useEffect, useRef, useState } from "react";
import { IonApp, IonContent, IonFooter, IonIcon } from "@ionic/react";
import {
  chatboxEllipses,
  chatboxEllipsesOutline,
  home,
  homeOutline,
  informationCircle,
  informationCircleOutline,
  library,
  libraryOutline,
  map,
  mapOutline,
  person,
  personOutline,
  school,
  schoolOutline,
  videocam,
  videocamOutline,
} from "ionicons/icons";
// Main pages
import AboutUsPage from "./pages/AboutUsPage";
import ChatbotPage from "./pages/ChatbotPage";
import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import ManualPage from "./pages/ManualPage";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicePage";
import { VideoItem } from "./pages/VideoPage";
import VideoPage from "./pages/VideoPage";
// Sub pages
import CreateAccountPage from "./subPages/CreateAccountPage";
import ForgotPasswordPage from "./subPages/ForgotPasswordPage";
import ISupportNZPage from "./subPages/ISupportNZPage";

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<
    | "aboutUs"
    | "chatbot"
    | "course"
    | "createAccount"
    | "forgotPassword"
    | "home"
    | "iSupportNZ"
    | "manual"
    | "profile"
    | "service"
    | "video"
  >("home");

  const [videoHistory, setVideoHistory] = useState<VideoItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const isCourseActive = activePage === "course" || activePage === "iSupportNZ";
  const isProfileActive =
    activePage === "profile" ||
    activePage === "createAccount" ||
    activePage === "forgotPassword";

  const renderContent = () => {
    switch (activePage) {
      case "aboutUs":
        return <AboutUsPage />;
      case "chatbot":
        return <ChatbotPage />;
      case "course":
        return <CoursePage onNavigate={(tab: any) => setActivePage(tab)} />;
      case "createAccount":
        return <CreateAccountPage onBack={() => setActivePage("profile")} />;
      case "forgotPassword":
        return <ForgotPasswordPage onBack={() => setActivePage("profile")} />;
      case "home":
        return (
          <HomePage
            onNavigate={(tab: any) => setActivePage(tab)}
            isLoggedIn={isLoggedIn}
          />
        );
      case "iSupportNZ":
        return <ISupportNZPage />;
      case "manual":
        return <ManualPage />;
      case "profile":
        return (
          <ProfilePage
            onNavigate={(tab: any) => setActivePage(tab)}
            isLoggedIn={isLoggedIn}
            onLogin={() => {
              setIsLoggedIn(true);
              console.log("Successfully logged in");
              setActivePage("home");
            }}
            onLogout={() => {
              setIsLoggedIn(false);
              console.log("Successfully logged out");
              setActivePage("home");
            }}
          />
        );
      case "service":
        return <ServicesPage />;
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
            onNavigate={(tab: any) => setActivePage(tab)}
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
  }, [activePage]);

  return (
    <IonApp>
      {/* Main content/page */}
      <IonContent ref={contentRef}>
        <div className="pb-24 pt-5">{renderContent()}</div>
      </IonContent>
      {/* Footer */}
      <IonFooter>
        <div className="flex justify-around items-center bg-white border-t border-gray-100 py-3 px-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          {/* Home */}
          <button
            onClick={() => setActivePage("home")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activePage === "home" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={activePage === "home" ? home : homeOutline}
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Home</span>
            {activePage === "home" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>
          {/* Videos (logged in) */}
          {isLoggedIn && (
            <button
              onClick={() => setActivePage("video")}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                activePage === "video" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <IonIcon
                icon={activePage === "video" ? videocam : videocamOutline}
                className="text-2xl mb-1"
              />
              <span className="text-[10px] font-medium">Videos</span>
              {activePage === "video" && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
              )}
            </button>
          )}
          {/* About Us (logged out) */}
          {!isLoggedIn && (
            <button
              onClick={() => setActivePage("aboutUs")}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                activePage === "aboutUs" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <IonIcon
                icon={
                  activePage === "aboutUs"
                    ? informationCircle
                    : informationCircleOutline
                }
                className="text-2xl mb-1"
              />
              <span className="text-[10px] font-medium">About Us</span>
              {activePage === "aboutUs" && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
              )}
            </button>
          )}
          {/* Course (logged in) */}
          {isLoggedIn && (
            <button
              onClick={() => setActivePage("course")}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                isCourseActive ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <IonIcon
                icon={isCourseActive ? school : schoolOutline}
                className="text-2xl mb-1"
              />
              <span className="text-[10px] font-medium">Course</span>

              {isCourseActive && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
              )}
            </button>
          )}
          {/* Services (logged in) */}
          {isLoggedIn && (
            <button
              onClick={() => setActivePage("service")}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                activePage === "service" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <IonIcon
                icon={activePage === "service" ? map : mapOutline}
                className="text-2xl mb-1"
              />
              <span className="text-[10px] font-medium">Services</span>
              {activePage === "service" && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
              )}
            </button>
          )}
          {/* Manual (logged out) */}
          {!isLoggedIn && (
            <button
              onClick={() => setActivePage("manual")}
              className={`flex flex-col items-center flex-1 py-1 transition-all ${
                activePage === "manual" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <IonIcon
                icon={activePage === "manual" ? library : libraryOutline}
                className="text-2xl mb-1"
              />
              <span className="text-[10px] font-medium">Manual</span>
              {activePage === "manual" && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
              )}
            </button>
          )}
          {/* Profile */}
          <button
            onClick={() => setActivePage("profile")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              isProfileActive ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={isProfileActive ? person : personOutline}
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Profile</span>
            {isProfileActive && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>
          {/* Chatbot */}
          <button
            onClick={() => setActivePage("chatbot")}
            className={`flex flex-col items-center flex-1 py-1 transition-all ${
              activePage === "chatbot" ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <IonIcon
              icon={
                activePage === "chatbot"
                  ? chatboxEllipses
                  : chatboxEllipsesOutline
              }
              className="text-2xl mb-1"
            />
            <span className="text-[10px] font-medium">Chatbot</span>
            {activePage === "chatbot" && (
              <div className="w-1 h-1 bg-blue-600 rounded-full mt-1" />
            )}
          </button>
        </div>
      </IonFooter>
    </IonApp>
  );
};

export default App;
