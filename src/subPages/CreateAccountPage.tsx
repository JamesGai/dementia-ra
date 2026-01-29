import React from "react";
import Button from "../components/universal/Button";
import GetStarted from "../components/profile/GetStarted";
import LabeledInput from "../components/profile/LabeledInput";
import Terms from "../components/profile/Terms";
import TextButton from "../components/universal/TextButton";

interface CreateAccountPageProps {
  onBack: () => void;
}

const handleCreate = () => {
  console.log("Account successfully created");
};

const CreateAccountPage: React.FC<CreateAccountPageProps> = ({ onBack }) => {
  return (
    <div className="p-4 space-y-6">
      <GetStarted content="Create an account to personalise your experience." />
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        </div>
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LabeledInput label="City *" type="text" placeholder="Enter city" />
          <div className="space-y-2">
            <div className="text-sm font-bold text-gray-900">Country *</div>
            <select
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#2e6f73]"
              defaultValue=""
            >
              <option value="" disabled>
                Enter Country
              </option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-900">User Role</div>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#2e6f73]"
            defaultValue=""
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="carer">Carer</option>
            <option value="family">Family member</option>
            <option value="professional">Health professional</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-bold text-gray-900">Purpose of Use</div>
          <select
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#2e6f73]"
            defaultValue=""
          >
            <option value="" disabled>
              Select purpose
            </option>
            <option value="personal">For personal support</option>
            <option value="family">For a family member</option>
            <option value="work">For professional use</option>
            <option value="research">For research</option>
          </select>
        </div>
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
