import React, { useState } from "react";
import { signIn } from "../../services/authService";
import Button from "../universal/Button";
import LabeledInput from "./LabeledInput";
import TextButton from "../universal/TextButton";

type ProfileLoggedOutProps = {
  onNavigate: (tab: "home" | "createAccount" | "forgotPassword") => void;
};

const ProfileLoggedOut: React.FC<ProfileLoggedOutProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      setIsSubmitting(true);
      await signIn(trimmedEmail, password);
      onNavigate("home");
    } catch (e) {
      setError("Login failed. Please check your details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
      <LabeledInput
        label="Email"
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <LabeledInput
        label="Password"
        type="password"
        placeholder="Enter password"
        showToggle
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextButton
        text="Forgot password?"
        onClick={() => onNavigate("forgotPassword")}
      />
      {error && <div className="text-sm text-red-600">{error}</div>}
      <Button
        text={isSubmitting ? "Logging in..." : "Login"}
        onClick={handleLogin}
      />
      <div className="text-center">
        <TextButton
          text="Don't have account?"
          onClick={() => onNavigate("createAccount")}
        />
      </div>
    </div>
  );
};

export default ProfileLoggedOut;
