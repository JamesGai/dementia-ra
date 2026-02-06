import React, { useEffect, useRef, useState } from "react";
import { IonApp, IonContent, IonFooter } from "@ionic/react";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { signOutUser } from "./services/authService";
import Footer from "./components/footer/Footer";
// Main pages
import AboutUsPage from "./pages/AboutUsPage";
import ChatbotPage from "./pages/ChatbotPage";
import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import ManualPage from "./pages/ManualPage";
import ProfilePage from "./pages/ProfilePage";
import ServicesPage from "./pages/ServicePage";
import VideoPage, { VideoItem } from "./pages/VideoPage";
// Sub pages
import CreateAccountPage from "./subPages/CreateAccountPage";
import ForgotPasswordPage from "./subPages/ForgotPasswordPage";
import ISupportNZPage from "./subPages/ISupportNZPage";

export type Page =
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
  | "video";

export type FooterItem = {
  key: string;
  label: string;
  to: Page;
  show: (isLoggedIn: boolean) => boolean;
  isActive: (activePage: Page) => boolean;
  iconFilled: string;
  iconOutline: string;
};

const App: React.FC = () => {
  const footerItems: FooterItem[] = [
    {
      key: "home",
      label: "Home",
      to: "home",
      show: () => true,
      isActive: (p) => p === "home",
      iconFilled: home,
      iconOutline: homeOutline,
    },
    {
      key: "videos",
      label: "Videos",
      to: "video",
      show: (logged) => logged,
      isActive: (p) => p === "video",
      iconFilled: videocam,
      iconOutline: videocamOutline,
    },
    {
      key: "about",
      label: "About Us",
      to: "aboutUs",
      show: (logged) => !logged,
      isActive: (p) => p === "aboutUs",
      iconFilled: informationCircle,
      iconOutline: informationCircleOutline,
    },
    {
      key: "course",
      label: "Course",
      to: "course",
      show: (logged) => logged,
      isActive: (p) => p === "course" || p === "iSupportNZ",
      iconFilled: school,
      iconOutline: schoolOutline,
    },
    {
      key: "services",
      label: "Services",
      to: "service",
      show: (logged) => logged,
      isActive: (p) => p === "service",
      iconFilled: map,
      iconOutline: mapOutline,
    },
    {
      key: "manual",
      label: "Manual",
      to: "manual",
      show: (logged) => !logged,
      isActive: (p) => p === "manual",
      iconFilled: library,
      iconOutline: libraryOutline,
    },
    {
      key: "profile",
      label: "Profile",
      to: "profile",
      show: () => true,
      isActive: (p) =>
        p === "profile" || p === "createAccount" || p === "forgotPassword",
      iconFilled: person,
      iconOutline: personOutline,
    },
    {
      key: "chatbot",
      label: "Chatbot",
      to: "chatbot",
      show: () => true,
      isActive: (p) => p === "chatbot",
      iconFilled: chatboxEllipses,
      iconOutline: chatboxEllipsesOutline,
    },
  ];

  const [activePage, setActivePage] = useState<Page>("home");
  const [videoHistory, setVideoHistory] = useState<VideoItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const addToVideoHistory = React.useCallback((video: VideoItem) => {
    setVideoHistory((prev) => {
      const filtered = prev.filter((v) => v.id !== video.id);
      return [video, ...filtered];
    });
  }, []);

  const scrollToTop = React.useCallback(() => {
    contentRef.current?.scrollToTop(0);
  }, []);

  const pages: Record<Page, React.ReactNode> = {
    aboutUs: <AboutUsPage />,
    chatbot: <ChatbotPage />,
    course: <CoursePage onNavigate={setActivePage} />,
    createAccount: (
      <CreateAccountPage onBack={() => setActivePage("profile")} />
    ),
    forgotPassword: (
      <ForgotPasswordPage onBack={() => setActivePage("profile")} />
    ),
    home: <HomePage onNavigate={setActivePage} isLoggedIn={isLoggedIn} />,
    iSupportNZ: <ISupportNZPage />,
    manual: <ManualPage />,
    profile: <ProfilePage onNavigate={setActivePage} isLoggedIn={isLoggedIn} />,
    service: <ServicesPage />,
    video: (
      <VideoPage
        addToVideoHistory={addToVideoHistory}
        historyVideos={videoHistory}
        scrollToTop={scrollToTop}
      />
    ),
  };

  useEffect(() => {
    scrollToTop();
  }, [activePage, scrollToTop]);

  // Firebase Auth listener automatically detects login state (logged in or out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Auth state: logged in", user.email);
        setIsLoggedIn(true);
      } else {
        console.log("Auth state: logged out");
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <IonApp>
      <IonContent ref={contentRef}>
        <div>{pages[activePage] ?? pages.home}</div>
      </IonContent>
      <IonFooter>
        <Footer
          activePage={activePage}
          setActivePage={setActivePage}
          isLoggedIn={isLoggedIn}
          items={footerItems}
        />
      </IonFooter>
    </IonApp>
  );
};

export default App;
