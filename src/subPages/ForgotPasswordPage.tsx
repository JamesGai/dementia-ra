import React, { useMemo, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { resetPassword } from "../services/authService";
import Button from "../components/universal/Button";
import GetStarted from "../components/profile/GetStarted";
import TextButton from "../components/universal/TextButton";
import LabeledInput from "../components/profile/LabeledInput";

interface ForgotPasswordPageProps {
  onBack: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Empty field examination
   */
  const fieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = "Please enter a valid email";
    }
    return errs;
  }, [email]);

  const hasErrors = Object.keys(fieldErrors).length > 0;
  const showError = (key: string) =>
    isSubmitAttempted ? fieldErrors[key] : undefined;

  const handleEmail = async () => {
    setIsSubmitAttempted(true);
    setError(null);
    setSuccess(null);
    if (hasErrors) return;
    try {
      setIsSubmitting(true);
      await resetPassword(email.trim());
      setSuccess(
        "If an account exists for this email, a reset link has been sent.",
      );
    } catch (e) {
      console.error("❌ Reset password failed:", e);
      setError("Could not send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`space-y-6 p-4 ${Capacitor.isNativePlatform() ? "pt-15" : ""}`}
    >
      <GetStarted content="Enter your email to reset password" />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <LabeledInput
          type="email"
          label="Email *"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={showError("email")}
        />
        {success && <div className="text-sm text-green-600">{success}</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Button
          text={isSubmitting ? "Sending..." : "Send"}
          onClick={handleEmail}
        />
        <div className="text-center">
          <TextButton text="Already have an account?" onClick={onBack} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
