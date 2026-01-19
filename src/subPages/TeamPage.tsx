import React from "react";

interface TeamPageProps {
  onBack: () => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onBack }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-[#2e6f73] font-semibold">
          ← Back
        </button>
      </div>

      {/* Intro */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <p className="text-gray-700 leading-relaxed">
          We are a team of international researchers passionate about improving
          the caregiving skills and mental health of those who care for someone
          with dementia.
        </p>
      </div>

      {/* New Zealand */}
      <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900">New Zealand</h2>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-800">Mr. James Gai</p>
            <p className="italic text-gray-600">Research Staff</p>
            <p className="text-gray-600">The University of Auckland</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
