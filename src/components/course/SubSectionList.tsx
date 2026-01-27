import React from "react";
import AccordionCard from "../universal/AccordionCard";
import Button from "../universal/Button";
import ModuleTitle from "./ModuleTitle";

export type SubsectionItem = {
  id: string;
  text: string;
  onClick: () => void;
};

export type SectionItem = {
  id: string;
  text: string;
  onClick?: () => void;
  subsections?: SubsectionItem[];
};

interface SectionAccordionListProps {
  sections: SectionItem[];
}

const SectionAccordionList: React.FC<SectionAccordionListProps> = ({
  sections,
}) => {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <AccordionCard
          key={section.id}
          title={<ModuleTitle number={section.id} title={section.text} />}
        >
          {section.subsections && section.subsections.length > 0 ? (
            <div className="space-y-2 pt-2">
              {section.subsections.map((sub) => (
                <div key={sub.id}>
                  <Button
                    text={`${sub.id}. ${sub.text}`}
                    onClick={sub.onClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 py-2">No subsections yet</div>
          )}
        </AccordionCard>
      ))}
    </div>
  );
};

export default SectionAccordionList;
