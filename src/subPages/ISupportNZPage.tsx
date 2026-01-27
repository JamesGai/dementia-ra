import React from "react";
import AccordionCard from "../components/universal/AccordionCard";
import ModuleTitle from "../components/course/ModuleTitle";
import TopBar from "../components/universal/TopBar";

const ISupportNZPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <TopBar title="iSupport NZ" />
      <AccordionCard
        title={
          <ModuleTitle
            moduleNumber={0}
            title="COURSE INTRODUCTION"
            imageSrc="Course Introduction.png"
          />
        }
      >
        <p>
          iSupport NZ is a self-help skills and training programme wtih 5
          moduiles for carers of people living with dementia. It aims to prevent
          and/or decrease mental and physical health problems associated with
          caregiving and to improve the quality of life of people (family
          carers) living with dementia.
        </p>
      </AccordionCard>
      <AccordionCard
        title={
          <ModuleTitle
            moduleNumber={1}
            title="INTRODUCTION TO DEMENTIA"
            imageSrc="Module 1.png"
          />
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <ModuleTitle
            moduleNumber={2}
            title="BEING A CAERE"
            imageSrc="Module 2.png"
          />
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <ModuleTitle
            moduleNumber={3}
            title="CARING FOR ME"
            imageSrc="Module 3.png"
          />
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <ModuleTitle
            moduleNumber={4}
            title="PROVIDING EVERYDAY CARE"
            imageSrc="Module 4.png"
          />
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <ModuleTitle
            moduleNumber={5}
            title="UNDERSTANDING CHANGES IN BEHAVIOUR"
            imageSrc="Module 5.png"
          />
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard title="NEW ZEALAND LOCAL RESOURCES">
        <></>
      </AccordionCard>
    </div>
  );
};

export default ISupportNZPage;
