import React, { useEffect, useRef, useState } from "react";
import {
  fetchMyProfile,
  signOutUser,
  subscribeToAuthChanges,
  updateMyProfile,
  User as FirestoreUser,
} from "../services/authService";
import Button from "../components/universal/Button";
import ProfileLoggedIn from "../components/profile/ProfileLoggedIn";
import ProfileLoggedOut from "../components/profile/ProfileLoggedOut";
import Settings from "../components/profile/Settings";

// User information that needs to be displayed only
export type ProfileUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  city: string;
  avatarUrl?: string;
};

interface ProfilePageProps {
  onNavigate: (tab: "home" | "createAccount" | "forgotPassword") => void;
  isLoggedIn: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  isLoggedIn,
}) => {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Extract first character from user's first name and last name
  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0).toUpperCase() ?? "";
    const last = lastName?.charAt(0).toUpperCase() ?? "";
    return `${first}${last}` || "U";
  };

  const openAvatarPicker = () => {
    fileInputRef.current?.click();
  };

  // Responsively detect newly updated image URL
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const previewUrl = URL.createObjectURL(file);
    setProfile((prev) => (prev ? { ...prev, avatarUrl: previewUrl } : prev));
    e.target.value = "";
  };

  // Responsively detect newly updated profile fields
  const handleProfileChange = (field: keyof ProfileUser, value: string) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEditOrSave = async () => {
    setProfileError(null);
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    if (!profile || !uid) {
      setProfileError("Cannot save profile: missing user session.");
      return;
    }
    try {
      setIsSaving(true);
      const updates: Partial<ProfileUser> = {
        firstName: profile.firstName.trim(),
        lastName: profile.lastName.trim(),
        phone: profile.phone.trim(),
        username: profile.username.trim(),
        city: profile.city.trim(),
        avatarUrl: profile.avatarUrl?.trim(),
      };
      await updateMyProfile(uid, updates);
      console.log("✅ Profile updated in Firestore");
      setIsEditing(false);
    } catch (e) {
      console.error("❌ Failed to save profile:", e);
      setProfileError("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Load Firestore profile for the currently logged-in user
  useEffect(() => {
    if (!isLoggedIn) {
      setProfile(null);
      setProfileError(null);
      setLoadingProfile(false);
      setIsEditing(false);
      setUid(null);
      return;
    }
    setLoadingProfile(true);
    setProfileError(null);
    const unsubscribe = subscribeToAuthChanges(async (fbUser) => {
      if (!fbUser) {
        setProfile(null);
        setUid(null);
        setLoadingProfile(false);
        return;
      }
      setUid(fbUser.uid);
      try {
        const data: FirestoreUser | null = await fetchMyProfile(fbUser.uid);
        if (!data) {
          setProfile(null);
          setProfileError("Profile not found in Firestore.");
        } else {
          const mapped: ProfileUser = {
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            email: data.email ?? fbUser.email ?? "",
            phone: data.phone ?? "",
            username: data.username ?? "",
            city: data.city ?? "",
            avatarUrl: "", // Initialize avatar status
          };
          setProfile(mapped);
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
              isSaving={isSaving}
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
