import React from "react";

interface ModuleTitleProps {
  moduleNumber: number;
  title: string;
}

const ModuleTitle: React.FC<ModuleTitleProps> = ({ moduleNumber, title }) => {
  return (
    <div className="leading-tight py-3">
      <div className="text-xs font-semibold tracking-widest text-gray-500">
        MODULE {moduleNumber}
      </div>
      <div className="text-[#2e6f73] font-extrabold">{title}</div>
    </div>
  );
};

export default ModuleTitle;
