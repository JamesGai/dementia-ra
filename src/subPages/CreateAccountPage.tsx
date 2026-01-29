import React from "react";
import Button from "../components/universal/Button";
import GetStarted from "../components/profile/GetStarted";
import LabeledInput from "../components/profile/LabeledInput";
import LabeledSelectionInput from "../components/profile/LabeledSelectionInput";
import Terms from "../components/profile/Terms";
import TextButton from "../components/universal/TextButton";

interface CreateAccountPageProps {
  onBack: () => void;
}

const handleCreate = () => {
  console.log("Account successfully created");
};

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onBack }) => {
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
  ];
  const userRoleOptions = [
    { value: "carer", label: "Carer" },
    { value: "family", label: "Family member" },
    { value: "professional", label: "Health professional" },
    { value: "other", label: "Other" },
  ];
  const purposeOptions = [
    { value: "personal", label: "For personal support" },
    { value: "family", label: "For a family member" },
    { value: "work", label: "For professional use" },
    { value: "research", label: "For research" },
  ];

  return (
    <div className="p-4 space-y-6">
      <GetStarted content="Create an account to personalise your experience." />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <LabeledInput
          label="First name *"
          type="text"
          placeholder="Enter first name"
        />
        <LabeledInput
          label="Last name *"
          type="text"
          placeholder="Enter last name"
        />
        <LabeledInput label="Email *" type="email" placeholder="Enter email" />
        <LabeledInput
          label="Phone number"
          type="text"
          placeholder="Enter phone number"
        />
        <LabeledInput
          label="Username *"
          type="text"
          placeholder="Enter username"
        />
        <LabeledInput
          label="Password *"
          type="password"
          placeholder="Enter password"
          showToggle
        />
        <LabeledInput
          label="Confirm password *"
          type="password"
          placeholder="Enter confirm password"
          showToggle
        />
        <LabeledInput label="City *" type="text" placeholder="Enter city" />
        <LabeledSelectionInput
          label="Country *"
          placeholder="Enter Country"
          options={countryOptions}
        />
        <LabeledSelectionInput
          label="User Role"
          placeholder="Select role"
          options={userRoleOptions}
        />
        <LabeledSelectionInput
          label="Purpose of Use"
          placeholder="Select purpose"
          options={purposeOptions}
        />

        <Terms />
        <Button text="Create account" onClick={handleCreate} />
        <div className="text-center">
          <TextButton text="Already have an account?" onClick={onBack} />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
