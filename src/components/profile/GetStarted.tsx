import React from "react";

interface GetStartedProps {
  content: string;
}

const GetStarted: React.FC<GetStartedProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-2">
      <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
        Get Started
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
};

export default GetStarted;
