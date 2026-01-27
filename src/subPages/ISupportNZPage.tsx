import React from "react";
import AccordionCard from "../components/universal/AccordionCard";
import ModuleTitle from "../components/course/ModuleTitle";
import SectionList from "../components/course/SectionList";
import TopBar from "../components/universal/TopBar";

type Section = {
  id: string;
  text: string;
  onClick: () => void;
};

type Module = {
  moduleNumber: number;
  title: string;
  imageSrc: string;
  introText?: string;
  sections?: Section[];
};

const ISupportNZPage: React.FC = () => {
  const modules: Module[] = [
    {
      moduleNumber: 0,
      title: "COURSE INTRODUCTION",
      imageSrc: "Course Introduction.png",
      introText:
        "iSupport NZ is a self-help skills and training programme with 5 modules for carers of people living with dementia. It aims to prevent and/or decrease mental and physical health problems associated with caregiving and to improve the quality of life of people (family carers) living with dementia.",
    },
    {
      moduleNumber: 1,
      title: "INTRODUCTION TO DEMENTIA",
      imageSrc: "Module 1.png",
      sections: [
        {
          id: "1.1",
          text: "Types of dementia and the progression",
          onClick: () => console.log("1.1"),
        },
        {
          id: "1.2",
          text: "Optimising brain health",
          onClick: () => console.log("1.2"),
        },
        {
          id: "1.3",
          text: "Person-centred care",
          onClick: () => console.log("1.3"),
        },
        {
          id: "1.4",
          text: "Planning for the future",
          onClick: () => console.log("1.4"),
        },
      ],
    },

    {
      moduleNumber: 2,
      title: "BEING A CARER",
      imageSrc: "Module 2.png",
      sections: [
        {
          id: "2.1",
          text: "The journey together",
          onClick: () => console.log("2.1"),
        },
        {
          id: "2.2",
          text: "Improving communication",
          onClick: () => console.log("2.2"),
        },
        {
          id: "2.3",
          text: "Supported decision-making",
          onClick: () => console.log("2.3"),
        },
        {
          id: "2.4",
          text: "Involving others",
          onClick: () => console.log("2.4"),
        },
      ],
    },
    {
      moduleNumber: 3,
      title: "CARING FOR ME",
      imageSrc: "Module 3.png",
      sections: [
        {
          id: "3.1",
          text: "Reducing stress in everyday life",
          onClick: () => console.log("3.1"),
        },
        {
          id: "3.2",
          text: "Making time for enjoyable activities",
          onClick: () => console.log("3.2"),
        },
        {
          id: "3.3",
          text: "Thinking differently",
          onClick: () => console.log("3.3"),
        },
      ],
    },
    {
      moduleNumber: 4,
      title: "PROVIDING EVERYDAY CARE",
      imageSrc: "Module 4.png",
      sections: [
        {
          id: "4.1",
          text: "An enjoyable day",
          onClick: () => console.log("4.1"),
        },
        {
          id: "4.2",
          text: "Eating and drinking - more pleasant mealtimes",
          onClick: () => console.log("4.2"),
        },
        {
          id: "4.3",
          text: "Eating, drinking, and preventing health problems",
          onClick: () => console.log("4.3"),
        },
        { id: "4.4", text: "Personal care", onClick: () => console.log("4.4") },
        {
          id: "4.5",
          text: "Toileting and continence care",
          onClick: () => console.log("4.5"),
        },
      ],
    },
    {
      moduleNumber: 5,
      title: "UNDERSTANDING CHANGES IN BEHAVIOUR",
      imageSrc: "Module 5.png",
      sections: [
        {
          id: "5.1",
          text: "Introduction to changes in behaviour",
          onClick: () => console.log("5.1"),
        },
        { id: "5.2", text: "Memory loss", onClick: () => console.log("5.2") },
        {
          id: "5.3",
          text: "Repetitive behaviour",
          onClick: () => console.log("5.3"),
        },
        {
          id: "5.4",
          text: "Depression, anxiety, and apathy",
          onClick: () => console.log("5.4"),
        },
        {
          id: "5.5",
          text: "Difficulty sleeping",
          onClick: () => console.log("5.5"),
        },
        {
          id: "5.6",
          text: "Walking and getting lost",
          onClick: () => console.log("5.6"),
        },
        {
          id: "5.7",
          text: "Changes in judgement",
          onClick: () => console.log("5.7"),
        },
        { id: "5.8", text: "Aggression", onClick: () => console.log("5.8") },
        {
          id: "5.9",
          text: "Delusions and hallucinations",
          onClick: () => console.log("5.9"),
        },
        {
          id: "5.10",
          text: "Putting it all together",
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
          key={`module-${m.moduleNumber}`}
          title={
            <ModuleTitle
              moduleNumber={m.moduleNumber}
              title={m.title}
              imageSrc={m.imageSrc}
            />
          }
        >
          {m.introText ? (
            <p className="text-sm text-gray-700 leading-relaxed">
              {m.introText}
            </p>
          ) : m.sections && m.sections.length > 0 ? (
            <SectionList sections={m.sections} />
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
