import React, { useEffect, useRef, useState } from "react";
import {
  signOutUser,
  fetchMyProfile,
  subscribeToAuthChanges,
  User as FirestoreUser,
} from "../services/authService";
import Button from "../components/universal/Button";
import ProfileLoggedIn from "../components/profile/ProfileLoggedIn";
import ProfileLoggedOut from "../components/profile/ProfileLoggedOut";
import Settings from "../components/profile/Settings";

type ProfileUser = {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
};

interface ProfilePageProps {
  onNavigate: (tab: "home" | "createAccount" | "forgotPassword") => void;
  isLoggedIn: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  isLoggedIn,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0).toUpperCase() ?? "";
    const last = lastName?.charAt(0).toUpperCase() ?? "";
    return `${first}${last}` || "U";
  };

  const openAvatarPicker = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);
    e.target.value = "";
  };

  const handleProfileChange = (field: keyof ProfileUser, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEditOrSave = () => {
    if (isEditing) {
      console.log("Profile saved", profile);
      // TODO: Save new profile to database
    }
    setIsEditing((prev) => !prev);
  };

  // Load Firestore profile for the currently logged-in user
  useEffect(() => {
    if (!isLoggedIn) {
      setProfile(null);
      setProfileError(null);
      setLoadingProfile(false);
      setIsEditing(false);
      return;
    }
    setLoadingProfile(true);
    setProfileError(null);
    const unsubscribe = subscribeToAuthChanges(async (fbUser) => {
      if (!fbUser) {
        setProfile(null);
        setLoadingProfile(false);
        return;
      }
      try {
        const data: FirestoreUser | null = await fetchMyProfile(fbUser.uid);
        if (!data) {
          setProfile(null);
          setProfileError("Profile not found in Firestore.");
        } else {
          setProfile({
            username: data.username ?? "",
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            phone: data.phone ?? "",
            email: data.email ?? fbUser.email ?? "",
            city: data.city ?? "",
          });
        }
      } catch (e) {
        console.error("❌ Failed to load profile:", e);
        setProfileError("Failed to load profile. Please try again.");
      } finally {
        setLoadingProfile(false);
      }
    });
    return () => unsubscribe();
  }, [isLoggedIn]);

  return (
    <div className="p-4 space-y-6">
      {!isLoggedIn && <ProfileLoggedOut onNavigate={onNavigate} />}
      {isLoggedIn && (
        <>
          {loadingProfile && (
            <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
              Loading profile...
            </div>
          )}
          {profileError && (
            <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-red-600">
              {profileError}
            </div>
          )}
          {!loadingProfile && !profileError && profile && (
            <ProfileLoggedIn
              isEditing={isEditing}
              avatarUrl={avatarUrl}
              profile={profile}
              inputRef={fileInputRef}
              getInitials={getInitials}
              onOpenAvatarPicker={openAvatarPicker}
              onAvatarChange={handleAvatarChange}
              onProfileChange={handleProfileChange}
              onEditOrSave={handleEditOrSave}
            />
          )}
        </>
      )}
      <Settings />
      {isLoggedIn && (
        <Button
          text="Logout"
          onClick={async () => {
            await signOutUser();
            onNavigate("home");
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;
