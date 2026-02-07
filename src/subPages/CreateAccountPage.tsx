import React, { useMemo, useState } from "react";
import { signUpWithProfile } from "../services/authService";
import Button from "../components/universal/Button";
import GetStarted from "../components/profile/GetStarted";
import LabeledInput from "../components/profile/LabeledInput";
import LabeledSelectionInput from "../components/profile/LabeledSelectionInput";
import Terms from "../components/profile/Terms";
import TextButton from "../components/universal/TextButton";

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
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Empty field examination
  const fieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!lastName.trim()) errs.lastName = "Last name is required";
    if (!email.trim()) errs.email = "Email is required";
    if (!username.trim()) errs.username = "Username is required";
    if (!password) errs.password = "Password is required";
    if (!confirmPassword) {
      errs.confirmPassword = "Confirm password is required";
    } else if (password && password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    if (!city.trim()) errs.city = "City is required";
    if (!country) errs.country = "Country is required";
    if (!acceptedTerms)
      errs.terms = "You must agree to the Terms and Privacy Policy.";
    return errs;
  }, [
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    city,
    country,
    acceptedTerms,
  ]);

  const hasErrors = Object.keys(fieldErrors).length > 0;
  const showError = (key: string) =>
    isSubmitAttempted ? fieldErrors[key] : undefined;

  // Firebase Auth creates an account and automatically signs in
  const handleCreate = async () => {
    setError(null);
    setIsSubmitAttempted(true);
    if (hasErrors) return;
    try {
      setIsSubmitting(true);
      await signUpWithProfile({
        email: email.trim(),
        password,
        profile: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          username: username.trim(),
          city: city.trim(),
          country: country.trim(),
          userRole: userRole.trim(),
          purposeOfUse: purposeOfUse.trim(),
        },
      });
      console.log("✅ Account created");
      onBack();
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
          error={showError("firstName")}
        />
        <LabeledInput
          type="text"
          label="Last name *"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={showError("lastName")}
        />
        <LabeledInput
          type="email"
          label="Email *"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={showError("email")}
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
          error={showError("username")}
        />
        <LabeledInput
          type="password"
          label="Password *"
          placeholder="Enter password"
          showToggle
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={showError("password")}
        />
        <LabeledInput
          type="password"
          label="Confirm password *"
          placeholder="Enter confirm password"
          showToggle
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={showError("confirmPassword")}
        />
        <LabeledInput
          type="text"
          label="City *"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={showError("city")}
        />
        <LabeledSelectionInput
          label="Country *"
          placeholder="Enter Country"
          options={countryOptions}
          value={country}
          onChange={setCountry}
          error={showError("country")}
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
        <Terms checked={acceptedTerms} onChange={setAcceptedTerms} />
        {isSubmitAttempted && fieldErrors.terms && (
          <div className="text-sm text-red-600">{fieldErrors.terms}</div>
        )}
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
