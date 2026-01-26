import React from "react";
import AccordionCard from "../universal/AccordionCard";
import Button from "../universal/Button";

interface QuickAccessProps {
  onNavigate: (tab: "aboutUs" | "manual") => void;
}

const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate }) => {
  return (
    <AccordionCard title="Quick Access">
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
    </AccordionCard>
  );
};

export default QuickAccess;
