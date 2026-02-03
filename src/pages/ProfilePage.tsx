import React, { useRef, useState } from "react";
import Avatar from "../components/profile/Avatar";
import Button from "../components/universal/Button";
import LabeledInput from "../components/profile/LabeledInput";
import TextButton from "../components/universal/TextButton";
import Settings from "../components/profile/Settings";

interface ProfilePageProps {
  onNavigate: (tab: "createAccount" | "forgotPassword") => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  isLoggedIn,
  onLogin,
  onLogout,
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
      {/* Logged out state */}
      {!isLoggedIn && (
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
          <LabeledInput label="Email" type="email" placeholder="Enter email" />
          <LabeledInput
            label="Password"
            type="password"
            placeholder="Enter password"
            showToggle
          />
          <TextButton
            text="Forgot password?"
            onClick={() => onNavigate("forgotPassword")}
          />
          <Button text="Login" onClick={onLogin} />
          <div className="text-center">
            <TextButton
              text="Don't have account?"
              onClick={() => onNavigate("createAccount")}
            />
          </div>
        </div>
      )}
      {/* Logged in state */}
      {isLoggedIn && (
        <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="text-lg font-bold text-gray-900">
            Personal details
          </div>
          <div className="flex items-center justify-between text-sm text-gray-700">
            <Avatar
              avatarUrl={avatarUrl}
              placeholder={getInitials(profile.firstName, profile.lastName)}
              onClick={openAvatarPicker}
              onChange={handleAvatarChange}
              inputRef={fileInputRef}
            />
            <span className="font-semibold text-gray-900">Username</span>
            <span className="text-gray-500">{profile.username}</span>
          </div>
          <LabeledInput
            type="text"
            label="First name"
            value={profile.firstName}
            readOnly={!isEditing}
            onChange={(event) =>
              handleProfileChange("firstName", event.target.value)
            }
          />
          <LabeledInput
            type="text"
            label="Last name"
            value={profile.lastName}
            readOnly={!isEditing}
            onChange={(event) =>
              handleProfileChange("lastName", event.target.value)
            }
          />
          <LabeledInput
            type="text"
            label="Phone number"
            value={profile.phone}
            readOnly={!isEditing}
            onChange={(event) =>
              handleProfileChange("phone", event.target.value)
            }
          />
          <LabeledInput
            type="email"
            label="Email"
            value={profile.email}
            readOnly={!isEditing}
            onChange={(event) =>
              handleProfileChange("email", event.target.value)
            }
          />
          <LabeledInput
            type="text"
            label="City"
            value={profile.city}
            readOnly={!isEditing}
            onChange={(event) =>
              handleProfileChange("city", event.target.value)
            }
          />
          <Button
            text={isEditing ? "Save Profile" : "Edit Profile"}
            onClick={handleEditOrSave}
          />
        </div>
      )}
      <Settings />
      {/* Logged in state */}
      {isLoggedIn && <Button text="Logout" onClick={onLogout} />}
    </div>
  );
};

export default ProfilePage;
