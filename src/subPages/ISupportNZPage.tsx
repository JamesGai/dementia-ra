import React, { useState } from "react";
import AccordionCard from "../components/universal/AccordionCard";
import CourseTitle from "../components/course/CourseTitle";
import SubSectionList from "../components/course/SubSectionList";
import SubsectionModal from "../components/course/SubsectionModal";
import TopBar from "../components/universal/TopBar";

type Module = {
  number: string;
  title: string;
  imageSrc: string;
  introtitle?: string;
  sections?: SectionItem[];
};

export type SectionItem = {
  number: string;
  title: string;
  subsections?: SubsectionItem[];
};

export type SubsectionItem = {
  number: string;
  title: string;
};

const ISupportNZPage: React.FC = () => {
  const modules: Module[] = [
    {
      number: "0",
      title: "COURSE INTRODUCTION",
      imageSrc: "Course Introduction.png",
      introtitle:
        "iSupport NZ is a self-help skills and training programme with 5 modules for carers of people living with dementia. It aims to prevent and/or decrease mental and physical health problems associated with caregiving and to improve the quality of life of people (family carers) living with dementia.",
    },
    {
      number: "1",
      title: "INTRODUCTION TO DEMENTIA",
      imageSrc: "Module 1.png",
      sections: [
        {
          number: "1.1",
          title: "Types of dementia and the progression",
          subsections: [
            {
              number: "1.1.0",
              title: "Why is this section important?",
            },
            {
              number: "1.1.1",
              title: "What is dementia?",
            },
            {
              number: "1.1.2",
              title: "What causes dementia?",
            },
            {
              number: "1.1.3",
              title:
                "What happens to people with dementia as the disease progresses?",
            },
            {
              number: "1.1.4",
              title:
                "What to do if you think that your family/whānau member or friend has dementia",
            },
            {
              number: "1.1.5",
              title: "How to reach out for help",
            },
          ],
        },
        {
          number: "1.2",
          title: "Optimising brain health",
        },
        {
          number: "1.3",
          title: "Person-centred care",
        },
        {
          number: "1.4",
          title: "Planning for the future",
        },
      ],
    },
    {
      number: "2",
      title: "BEING A CARER",
      imageSrc: "Module 2.png",
      sections: [
        {
          number: "2.1",
          title: "The journey together",
        },
        {
          number: "2.2",
          title: "Improving communication",
        },
        {
          number: "2.3",
          title: "Supported decision-making",
        },
        {
          number: "2.4",
          title: "Involving others",
        },
      ],
    },
    {
      number: "3",
      title: "CARING FOR ME",
      imageSrc: "Module 3.png",
      sections: [
        {
          number: "3.1",
          title: "Reducing stress in everyday life",
        },
        {
          number: "3.2",
          title: "Making time for enjoyable activities",
        },
        {
          number: "3.3",
          title: "Thinking differently",
        },
      ],
    },
    {
      number: "4",
      title: "PROVIDING EVERYDAY CARE",
      imageSrc: "Module 4.png",
      sections: [
        {
          number: "4.1",
          title: "An enjoyable day",
        },
        {
          number: "4.2",
          title: "Eating and drinking - more pleasant mealtimes",
        },
        {
          number: "4.3",
          title: "Eating, drinking, and preventing health problems",
        },
        {
          number: "4.4",
          title: "Personal care",
        },
        {
          number: "4.5",
          title: "Toileting and continence care",
        },
      ],
    },
    {
      number: "5",
      title: "UNDERSTANDING CHANGES IN BEHAVIOUR",
      imageSrc: "Module 5.png",
      sections: [
        {
          number: "5.1",
          title: "Introduction to changes in behaviour",
        },
        {
          number: "5.2",
          title: "Memory loss",
        },
        {
          number: "5.3",
          title: "Repetitive behaviour",
        },
        {
          number: "5.4",
          title: "Depression, anxiety, and apathy",
        },
        {
          number: "5.5",
          title: "Difficulty sleeping",
        },
        {
          number: "5.6",
          title: "Walking and getting lost",
        },
        {
          number: "5.7",
          title: "Changes in judgement",
        },
        {
          number: "5.8",
          title: "Aggression",
        },
        {
          number: "5.9",
          title: "Delusions and hallucinations",
        },
        {
          number: "5.10",
          title: "Putting it all together",
        },
      ],
    },
  ];

  const [isSubsectionOpen, setIsSubsectionOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<
    SubsectionItem | undefined
  >(undefined);

  const handleOpenSubsection = (sub: SubsectionItem) => {
    setSelectedSubsection(sub);
    setIsSubsectionOpen(true);
  };

  return (
    <div className="p-4 space-y-6">
      <TopBar title="iSupport NZ" />
      {modules.map((m) => (
        <AccordionCard
          key={`module-${m.number}`}
          title={
            <CourseTitle
              variant="module"
              number={m.number}
              title={m.title}
              imageSrc={m.imageSrc}
            />
          }
        >
          {m.introtitle ? (
            <p className="title-sm title-gray-700 leading-relaxed">
              {m.introtitle}
            </p>
          ) : m.sections && m.sections.length > 0 ? (
            <SubSectionList
              sections={m.sections}
              openSubsection={handleOpenSubsection}
            />
          ) : (
            <></>
          )}
        </AccordionCard>
      ))}
      <AccordionCard title="NEW ZEALAND LOCAL RESOURCES">
        <></>
      </AccordionCard>
      <SubsectionModal
        isOpen={isSubsectionOpen}
        onClose={() => setIsSubsectionOpen(false)}
        subsection={selectedSubsection}
      />
    </div>
  );
};

export default ISupportNZPage;
