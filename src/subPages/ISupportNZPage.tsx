import React from "react";
import AccordionCard from "../components/universal/AccordionCard";
import ModuleTitle from "../components/course/CourseTitle";
import SubSectionList from "../components/course/SubSectionList";
import TopBar from "../components/universal/TopBar";
import CourseTitle from "../components/course/CourseTitle";

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
  onClick: () => void;
  subsections?: SubsectionItem[];
};

type SubsectionItem = {
  number: string;
  title: string;
  onClick: () => void;
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
          onClick: () => console.log("1.1"),
          subsections: [
            {
              number: "1.1.0",
              title: "Why is this section important?",
              onClick: () => console.log("1.1.0"),
            },
            {
              number: "1.1.1",
              title: "What is dementia?",
              onClick: () => console.log("1.1.1"),
            },
            {
              number: "1.1.2",
              title: "What causes dementia?",
              onClick: () => console.log("1.1.2"),
            },
            {
              number: "1.1.3",
              title:
                "What happens to people with dementia as the disease progresses?",
              onClick: () => console.log("1.1.3"),
            },
            {
              number: "1.1.4",
              title:
                "What to do if you think that your family/whānau member or friend has dementia",
              onClick: () => console.log("1.1.4"),
            },
            {
              number: "1.1.5",
              title: "How to reach out for help",
              onClick: () => console.log("1.1.5"),
            },
          ],
        },
        {
          number: "1.2",
          title: "Optimising brain health",
          onClick: () => console.log("1.2"),
        },
        {
          number: "1.3",
          title: "Person-centred care",
          onClick: () => console.log("1.3"),
        },
        {
          number: "1.4",
          title: "Planning for the future",
          onClick: () => console.log("1.4"),
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
          onClick: () => console.log("2.1"),
        },
        {
          number: "2.2",
          title: "Improving communication",
          onClick: () => console.log("2.2"),
        },
        {
          number: "2.3",
          title: "Supported decision-making",
          onClick: () => console.log("2.3"),
        },
        {
          number: "2.4",
          title: "Involving others",
          onClick: () => console.log("2.4"),
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
          onClick: () => console.log("3.1"),
        },
        {
          number: "3.2",
          title: "Making time for enjoyable activities",
          onClick: () => console.log("3.2"),
        },
        {
          number: "3.3",
          title: "Thinking differently",
          onClick: () => console.log("3.3"),
        },
      ],
    },
    {
      number: "4",
      title: "PROVnumberING EVERYDAY CARE",
      imageSrc: "Module 4.png",
      sections: [
        {
          number: "4.1",
          title: "An enjoyable day",
          onClick: () => console.log("4.1"),
        },
        {
          number: "4.2",
          title: "Eating and drinking - more pleasant mealtimes",
          onClick: () => console.log("4.2"),
        },
        {
          number: "4.3",
          title: "Eating, drinking, and preventing health problems",
          onClick: () => console.log("4.3"),
        },
        {
          number: "4.4",
          title: "Personal care",
          onClick: () => console.log("4.4"),
        },
        {
          number: "4.5",
          title: "Toileting and continence care",
          onClick: () => console.log("4.5"),
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
          onClick: () => console.log("5.1"),
        },
        {
          number: "5.2",
          title: "Memory loss",
          onClick: () => console.log("5.2"),
        },
        {
          number: "5.3",
          title: "Repetitive behaviour",
          onClick: () => console.log("5.3"),
        },
        {
          number: "5.4",
          title: "Depression, anxiety, and apathy",
          onClick: () => console.log("5.4"),
        },
        {
          number: "5.5",
          title: "Difficulty sleeping",
          onClick: () => console.log("5.5"),
        },
        {
          number: "5.6",
          title: "Walking and getting lost",
          onClick: () => console.log("5.6"),
        },
        {
          number: "5.7",
          title: "Changes in judgement",
          onClick: () => console.log("5.7"),
        },
        {
          number: "5.8",
          title: "Aggression",
          onClick: () => console.log("5.8"),
        },
        {
          number: "5.9",
          title: "Delusions and hallucinations",
          onClick: () => console.log("5.9"),
        },
        {
          number: "5.10",
          title: "Putting it all together",
          onClick: () => console.log("5.10"),
        },
      ],
    },
  ];

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
            <SubSectionList sections={m.sections} />
          ) : (
            <></>
          )}
        </AccordionCard>
      ))}
      <AccordionCard title="NEW ZEALAND LOCAL RESOURCES">
        <></>
      </AccordionCard>
    </div>
  );
};

export default ISupportNZPage;
