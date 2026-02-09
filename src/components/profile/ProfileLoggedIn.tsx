import React, { useMemo, useState } from "react";
import { ProfileUser } from "../../pages/ProfilePage";
import Avatar from "./Avatar";
import Button from "../universal/Button";
import LabeledInput from "./LabeledInput";

type ProfileLoggedInProps = {
  isEditing: boolean;
  isSaving: boolean;
  profile: ProfileUser;
  inputRef: React.RefObject<HTMLInputElement | null>;
  getInitials: (firstName?: string, lastName?: string) => string;
  onOpenAvatarPicker: () => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileChange: (field: keyof ProfileUser, value: string) => void;
  onEditOrSave: () => void;
};

const ProfileLoggedIn: React.FC<ProfileLoggedInProps> = ({
  isEditing,
  isSaving,
  profile,
  inputRef,
  getInitials,
  onOpenAvatarPicker,
  onAvatarChange,
  onProfileChange,
  onEditOrSave,
}) => {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const fieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!profile.firstName.trim()) errs.firstName = "First name is required";
    if (!profile.lastName.trim()) errs.lastName = "Last name is required";
    if (!profile.username.trim()) errs.username = "Username is required";
    if (!profile.email.trim()) errs.email = "Email is required";
    if (!profile.city.trim()) errs.city = "City is required";
    return errs;
  }, [profile]);

  const hasErrors = Object.keys(fieldErrors).length > 0;
  const showError = (key: keyof ProfileUser) =>
    isEditing && submitAttempted ? fieldErrors[key] : undefined;
  const req = (label: string) => (isEditing ? `${label} *` : label);

  const handleEditOrSave = () => {
    if (!isEditing) {
      setSubmitAttempted(false);
      onEditOrSave();
      return;
    }
    setSubmitAttempted(true);
    if (hasErrors) return;
    onEditOrSave();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
      <div className="text-lg font-bold text-gray-900">Personal details</div>
      <div className="flex items-center justify-between text-sm text-gray-700">
        <Avatar
          avatarUrl={profile.avatarUrl}
          placeholder={getInitials(profile.firstName, profile.lastName)}
          isEditing={isEditing}
          onClick={onOpenAvatarPicker}
          onChange={onAvatarChange}
          inputRef={inputRef}
        />
        <span className="font-semibold text-gray-900">Username</span>
        <span className="text-gray-500">{profile.username}</span>
      </div>
      <LabeledInput
        type="text"
        label={req("Username")}
        value={profile.firstName}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("firstName", event.target.value)}
        error={showError("firstName")}
      />
      <LabeledInput
        type="text"
        label={req("Last name")}
        value={profile.lastName}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("lastName", event.target.value)}
        error={showError("lastName")}
      />
      <LabeledInput
        type="text"
        label={req("Phone number")}
        value={profile.phone}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("phone", event.target.value)}
        error={showError("phone")}
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
        label={req("City")}
        value={profile.city}
        readOnly={!isEditing}
        onChange={(event) => onProfileChange("city", event.target.value)}
        error={showError("city")}
      />
      <Button
        text={
          isSaving ? "Saving..." : isEditing ? "Save Profile" : "Edit Profile"
        }
        onClick={handleEditOrSave}
      />
    </div>
  );
};

export default ProfileLoggedIn;
