import React from "react";
import AccordionCard from "../universal/AccordionCard";
import Button from "../universal/Button";
import CourseTitle from "./CourseTitle";
import { SectionItem, SubsectionItem } from "../../subPages/iSupportNZPage";

interface SectionAccordionListProps {
  sections: SectionItem[];
  openSubsection: (sub: SubsectionItem) => void;
}

const SectionAccordionList: React.FC<SectionAccordionListProps> = ({
  sections,
  openSubsection,
}) => {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <AccordionCard
          key={section.number}
          title={
            <CourseTitle
              variant="section"
              number={section.number}
              title={section.title}
            />
          }
        >
          {section.subsections && section.subsections.length > 0 ? (
            <div className="space-y-2 pt-2">
              {section.subsections.map((sub) => (
                <div key={sub.number}>
                  <Button
                    text={`${sub.number}. ${sub.title}`}
                    onClick={() => openSubsection(sub)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="title-sm title-gray-500 py-2">
              No subsections yet
            </div>
          )}
        </AccordionCard>
      ))}
    </div>
  );
};

export default SectionAccordionList;
