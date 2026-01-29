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
    { value: "nz", label: "New Zealand" },
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
  ];
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

  return (
    <div className="p-4 space-y-6">
      <GetStarted content="Create an account to personalise your experience." />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <LabeledInput
          type="text"
          label="First name *"
          placeholder="Enter first name"
        />
        <LabeledInput
          type="text"
          label="Last name *"
          placeholder="Enter last name"
        />
        <LabeledInput type="email" label="Email *" placeholder="Enter email" />
        <LabeledInput
          type="text"
          label="Phone number"
          placeholder="Enter phone number"
        />
        <LabeledInput
          type="text"
          label="Username *"
          placeholder="Enter username"
        />
        <LabeledInput
          type="password"
          label="Password *"
          placeholder="Enter password"
          showToggle
        />
        <LabeledInput
          type="password"
          label="Confirm password *"
          placeholder="Enter confirm password"
          showToggle
        />
        <LabeledInput type="text" label="City *" placeholder="Enter city" />
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
