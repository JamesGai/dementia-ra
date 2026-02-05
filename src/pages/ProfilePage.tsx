import React, { useRef, useState } from "react";
import { signOutUser } from "../services/authService";
import Button from "../components/universal/Button";
import ProfileLoggedIn from "../components/profile/ProfileLoggedIn";
import ProfileLoggedOut from "../components/profile/ProfileLoggedOut";
import Settings from "../components/profile/Settings";

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
  const [profile, setProfile] = useState({
    username: "12345",
    firstName: "James",
    lastName: "Gai",
    phone: "12345",
    email: "jamesgai@example.com",
    city: "Auckland",
  });

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

  const handleProfileChange = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditOrSave = () => {
    if (isEditing) {
      console.log("Profile saved", profile);
      // TODO: Save new profile to database
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="p-4 space-y-6">
      {!isLoggedIn && <ProfileLoggedOut onNavigate={onNavigate} />}
      {isLoggedIn && (
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
