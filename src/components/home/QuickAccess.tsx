import React from "react";
import Button from "../universe/Button";

interface QuickAccessProps {
  onNavigate: (tab: "aboutUs" | "manual") => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
      <div className="space-y-4">
        <div className="text-[#2e6f73] font-extrabold tracking-wide uppercase">
          Quick Access
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Button
            text="iSupport Course"
            onClick={() => console.log("Go to iSupport")}
          />
          <Button
            text="Educational Videos"
            onClick={() => console.log("Go to Videos")}
          />
          <Button
            text="Dementia News"
            onClick={() => console.log("Go to News")}
          />
          <Button
            text="Local Support Services"
            onClick={() => console.log("Go to Services")}
          />
          <Button text="About Us" onClick={() => onNavigate("aboutUs")} />
          <Button text="User Guide" onClick={() => onNavigate("manual")} />
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
