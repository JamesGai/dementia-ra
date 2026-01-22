import React from "react";

interface TheTeamProps {
  onNavigate: (tab: "createAccount") => void;
}

const CreateAccount: React.FC<TheTeamProps> = ({ onNavigate }) => {
  return (
    <div className="text-center">
      <button
        onClick={() => onNavigate("createAccount")}
        type="button"
        className="text-sm font-semibold text-[#2e6f73] active:opacity-70"
      >
        Don't have an account?
      </button>
    </div>
  );
};

export default CreateAccount;
