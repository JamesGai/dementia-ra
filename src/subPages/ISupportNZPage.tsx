import React from "react";
import AccordionCard from "../components/universal/AccordionCard";
import ModuleTitle from "../components/course/ModuleTitle";
import TopBar from "../components/universal/TopBar";

const ISupportNZPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <TopBar title="iSupport NZ" />
      <AccordionCard title="COURSE INTRODUCTION">
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
          <ModuleTitle moduleNumber={1} title="INTRODUCTION TO DEMENTIA" />
        }
      >
        <></>
      </AccordionCard>

      <AccordionCard
        title={<ModuleTitle moduleNumber={2} title="BEING A CAERE" />}
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={<ModuleTitle moduleNumber={3} title="CARING FOR ME" />}
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={<ModuleTitle moduleNumber={4} title="PROVIDING EVERYDAY CARE" />}
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <ModuleTitle
            moduleNumber={5}
            title="UNDERSTANDING CHANGES IN BEHAVIOUR"
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
