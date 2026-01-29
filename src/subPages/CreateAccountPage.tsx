import React from "react";
import { IonSelectOption } from "@ionic/react";
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
    { value: "us", option: "United States" },
    { value: "ca", option: "Canada" },
    { value: "uk", option: "United Kingdom" },
    { value: "au", option: "Australia" },
  ];
  const userRoleOptions = [
    { value: "carer", option: "Carer" },
    { value: "family", option: "Family member" },
    { value: "professional", option: "Health professional" },
    { value: "other", option: "Other" },
  ];
  const purposeOptions = [
    { value: "personal", option: "For personal support" },
    { value: "family", option: "For a family member" },
    { value: "work", option: "For professional use" },
    { value: "research", option: "For research" },
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
        <LabeledSelectionInput label="Country *" placeholder="Enter Country">
          {countryOptions.map((option) => (
            <IonSelectOption key={option.value} value={option.value}>
              {option.option}
            </IonSelectOption>
          ))}
        </LabeledSelectionInput>
        <LabeledSelectionInput label="User Role" placeholder="Select role">
          {userRoleOptions.map((option) => (
            <IonSelectOption key={option.value} value={option.value}>
              {option.option}
            </IonSelectOption>
          ))}
        </LabeledSelectionInput>

        <LabeledSelectionInput
          label="Purpose of Use"
          placeholder="Select purpose"
        >
          {purposeOptions.map((option) => (
            <IonSelectOption key={option.value} value={option.value}>
              {option.option}
            </IonSelectOption>
          ))}
        </LabeledSelectionInput>

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
