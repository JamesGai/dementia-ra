import React from "react";
import Button from "../universal/Button";

export interface SectionItem {
  id: string;
  text: string;
  onClick: () => void;
}

interface SectionListProps {
  sections: SectionItem[];
}

const SectionList: React.FC<SectionListProps> = ({ sections }) => {
  return (
    <div className="overflow-hidden shadow-md bg-white">
      <div className="section-list">
        {sections.map((section) => (
          <div key={section.id} className="pt-1">
            <div className="text-xs font-semibold tracking-widest text-gray-500">
              Section {section.id}
            </div>
            <Button text={section.text} onClick={section.onClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionList;
