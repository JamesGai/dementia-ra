import React, { useState } from "react";
import Button from "../components/universal/Button";
import GetStarted from "../components/profile/GetStarted";
import LabeledInput from "../components/profile/LabeledInput";
import LabeledSelectionInput from "../components/profile/LabeledSelectionInput";
import Terms from "../components/profile/Terms";
import TextButton from "../components/universal/TextButton";
import { signUpWithProfile } from "../services/authService";

interface CreateAccountPageProps {
  onBack: () => void;
}

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onBack }) => {
  const countryOptions = [{ value: "nz", label: "New Zealand" }];
  const userRoleOptions = [
    { value: "carer", label: "Carer" },
    { value: "family", label: "Health Professional" },
    { value: "professional", label: "Health professional" },
    { value: "researcher", label: "Researcher" },
    { value: "user", label: "General User" },
    { value: "other", label: "Other" },
  ];
  const purposeOptions = [
    { value: "personal", label: "For personal support" },
    { value: "family", label: "For a family member" },
    { value: "researcher", label: "For researcher" },
    { value: "work", label: "For professional training" },
    { value: "other", label: "Other" },
  ];

  // User collection fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [userRole, setUserRole] = useState("");
  const [purposeOfUse, setPurposeOfUse] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    // Field validation
    if (!firstName.trim() || !lastName.trim())
      return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter an email.");
    if (!username.trim()) return setError("Please enter a username.");
    if (!password) return setError("Please enter a password.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");
    if (!city.trim()) return setError("Please enter a city.");
    if (!country) return setError("Please select a country.");
    try {
      setIsSubmitting(true);
      await signUpWithProfile({
        email: email.trim(),
        password,
        profile: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          username: username.trim(),
          ...(phone.trim() ? { phone: phone.trim() } : {}),
          city: city.trim(),
          country: country.trim(),
          ...(userRole ? { userRole } : {}),
          ...(purposeOfUse ? { purposeOfUse } : {}),
        },
      });
      console.log("✅ Account created");
    } catch (e) {
      console.error("❌ Create account failed:", e);
      setError("Create account failed. Try a different email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <GetStarted content="Create an account to personalise your experience." />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <LabeledInput
          type="text"
          label="First name *"
          placeholder="Enter first name"
          // Should keep the value field so React remains the single source of truth for the input, ensuring the UI, state, validation, and resets always stay in sync.
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <LabeledInput
          type="text"
          label="Last name *"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <LabeledInput
          type="email"
          label="Email *"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabeledInput
          type="text"
          label="Phone number"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <LabeledInput
          type="text"
          label="Username *"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LabeledInput
          type="password"
          label="Password *"
          placeholder="Enter password"
          showToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LabeledInput
          type="password"
          label="Confirm password *"
          placeholder="Enter confirm password"
          showToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <LabeledInput
          type="text"
          label="City *"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <LabeledSelectionInput
          label="Country *"
          placeholder="Enter Country"
          options={countryOptions}
          value={country}
          onChange={setCountry}
        />
        <LabeledSelectionInput
          label="User Role"
          placeholder="Select role"
          options={userRoleOptions}
          value={userRole}
          onChange={setUserRole}
        />
        <LabeledSelectionInput
          label="Purpose of Use"
          placeholder="Select purpose"
          options={purposeOptions}
          value={purposeOfUse}
          onChange={setPurposeOfUse}
        />
        <Terms />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Button
          text={isSubmitting ? "Creating..." : "Create account"}
          onClick={handleCreate}
        />
        <div className="text-center">
          <TextButton text="Already have an account?" onClick={onBack} />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
