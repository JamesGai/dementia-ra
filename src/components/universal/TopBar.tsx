import React from "react";

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-bold text-gray-900">{title}</div>
      <div className="w-[56px]" />
    </div>
  );
};

export default TopBar;
