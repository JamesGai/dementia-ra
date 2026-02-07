import React, { useMemo, useState } from "react";
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
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const emailError = useMemo(() => {
    if (!submitAttempted) return undefined;
    if (!email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      return "Please enter a valid email";
    return undefined;
  }, [email, submitAttempted]);

  const handleEmail = async () => {
    setSubmitAttempted(true);
    setError(null);
    setSuccess(null);
    if (emailError) return;
    try {
      console.log("aaaaaaaaaaaa");
      setIsSending(true);
      await resetPassword(email.trim());
      setSuccess(
        "If an account exists for this email, a reset link has been sent.",
      );
    } catch (e) {
      console.error("❌ Reset password failed:", e);
      setError("Could not send reset email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <GetStarted content="Enter your email to reset password" />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <LabeledInput
          type="email"
          label="Email *"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        {success && <div className="text-sm text-green-600">{success}</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Button
          text={isSending ? "Sending..." : "Send"}
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
