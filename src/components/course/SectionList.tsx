import React from "react";
import { Section, Subsection } from "../../services/courseService";
import AccordionCard from "../universal/AccordionCard";
import TitleButton from "../universal/TitleButton";
import CourseTitle from "./CourseTitle";

interface SectionListProps {
  moduleId: string;
  sections: Section[];
  subsections: Record<string, Subsection[]>;
  openSubsection: (sub: Subsection) => void;
}

const SectionList: React.FC<SectionListProps> = ({
  moduleId,
  sections,
  subsections,
  openSubsection,
}) => {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <AccordionCard
          key={section.id}
          title={
            <CourseTitle
              variant="section"
              number={`${section.moduleNumber}.${section.sectionNumber}`}
              title={section.title}
            />
          }
        >
          {subsections[`${moduleId}/${section.id}`]?.length > 0 ? (
            <div className="space-y-2 pt-2">
              {subsections[`${moduleId}/${section.id}`].map((sub) => (
                <TitleButton
                  key={sub.id}
                  title={
                    sub.sectionNumber === 99 && sub.subsectionNumber === 99 ? (
                      <div>{sub.title}</div>
                    ) : (
                      <>
                        <div>
                          {sub.moduleNumber}.{sub.sectionNumber}.
                          {sub.subsectionNumber}.
                        </div>
                        <div>{sub.title}</div>
                      </>
                    )
                  }
                  onClick={() => openSubsection(sub)}
                />
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

export default SectionList;
