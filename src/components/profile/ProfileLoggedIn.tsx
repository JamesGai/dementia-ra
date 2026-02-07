import React from "react";
import Avatar from "./Avatar";
import Button from "../universal/Button";
import LabeledInput from "./LabeledInput";

type Profile = {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
};

type ProfileLoggedInProps = {
  isEditing: boolean;
  isSaving: boolean;
  avatarUrl: string | null;
  profile: Profile;
  inputRef: React.RefObject<HTMLInputElement | null>;
  getInitials: (firstName?: string, lastName?: string) => string;
  onOpenAvatarPicker: () => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileChange: (field: keyof Profile, value: string) => void;
  onEditOrSave: () => void;
};

const ProfileLoggedIn: React.FC<ProfileLoggedInProps> = ({
  isEditing,
  isSaving,
  avatarUrl,
  profile,
  inputRef,
  getInitials,
  onOpenAvatarPicker,
  onAvatarChange,
  onProfileChange,
  onEditOrSave,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
      <div className="text-lg font-bold text-gray-900">Personal details</div>
      <div className="flex items-center justify-between text-sm text-gray-700">
        <Avatar
          avatarUrl={avatarUrl}
          placeholder={getInitials(profile.firstName, profile.lastName)}
          onClick={onOpenAvatarPicker}
          onChange={onAvatarChange}
          inputRef={inputRef}
        />
        <span className="font-semibold text-gray-900">Username</span>
        <span className="text-gray-500">{profile.username}</span>
      </div>
      <LabeledInput
        type="text"
        label="First name"
        value={profile.firstName}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("firstName", event.target.value)}
      />
      <LabeledInput
        type="text"
        label="Last name"
        value={profile.lastName}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("lastName", event.target.value)}
      />
      <LabeledInput
        type="text"
        label="Phone number"
        value={profile.phone}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("phone", event.target.value)}
      />
      <LabeledInput
        type="email"
        label="Email"
        value={profile.email}
        readOnly
        onChange={() => {}}
      />
      <LabeledInput
        type="text"
        label="City"
        value={profile.city}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("city", event.target.value)}
      />
      <Button
        text={
          isSaving ? "Saving..." : isEditing ? "Save Profile" : "Edit Profile"
        }
        onClick={onEditOrSave}
      />
    </div>
  );
};

export default ProfileLoggedIn;
