import React, { useEffect, useRef, useState } from "react";
import {
  signOutUser,
  fetchMyProfile,
  subscribeToAuthChanges,
  User as FirestoreUser,
  updateMyProfile,
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
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [originalProfile, setOriginalProfile] = useState<ProfileUser | null>(
    null,
  );
  const [uid, setUid] = useState<string | null>(null);

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

  const handleEditOrSave = async () => {
    setProfileError(null);
    if (!isEditing) {
      setOriginalProfile(profile); // snapshot for cancel/revert if needed later
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
        username: profile.username.trim(),
        city: profile.city.trim(),
        phone: profile.phone.trim(),
      };
      await updateMyProfile(uid, updates);
      console.log("✅ Profile updated in Firestore");
      setOriginalProfile(profile);
      setIsEditing(false);
    } catch (e) {
      console.error("❌ Failed to save profile:", e);
      setProfileError("Failed to save profile. Please try again.");
      if (originalProfile) setProfile(originalProfile);
    } finally {
      setIsSaving(false);
    }
  };

  // Load Firestore profile for the currently logged-in user
  useEffect(() => {
    if (!isLoggedIn) {
      setProfile(null);
      setOriginalProfile(null);
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
        setOriginalProfile(null);
        setUid(null);
        setLoadingProfile(false);
        return;
      }
      setUid(fbUser.uid);
      try {
        const data: FirestoreUser | null = await fetchMyProfile(fbUser.uid);

        if (!data) {
          setProfile(null);
          setOriginalProfile(null);
          setProfileError("Profile not found in Firestore.");
        } else {
          const mapped: ProfileUser = {
            username: data.username ?? "",
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            phone: data.phone ?? "",
            email: data.email ?? fbUser.email ?? "",
            city: data.city ?? "",
          };
          setProfile(mapped);
          setOriginalProfile(mapped);
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
