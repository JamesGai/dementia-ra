import React from "react";
import AccordionCard from "../components/universal/AccordionCard";
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
          <div className="leading-tight pt-3 pb-3">
            <div className="text-xs font-semibold tracking-widest text-gray-500">
              MODULE 1
            </div>
            <div>Introduction to Dementia</div>
          </div>
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <div className="leading-tight pt-3 pb-3">
            <div className="text-xs font-semibold tracking-widest text-gray-500">
              MODULE 2
            </div>
            <div>BEING A CARER</div>
          </div>
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <div className="leading-tight pt-3 pb-3">
            <div className="text-xs font-semibold tracking-widest text-gray-500">
              MODULE 3
            </div>
            <div>CARING FOR ME</div>
          </div>
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <div className="leading-tight pt-3 pb-3">
            <div className="text-xs font-semibold tracking-widest text-gray-500">
              MODULE 4
            </div>
            <div>PROVIDING EVERYDAY CARE</div>
          </div>
        }
      >
        <></>
      </AccordionCard>
      <AccordionCard
        title={
          <div className="leading-tight pt-3 pb-3">
            <div className="text-xs font-semibold tracking-widest text-gray-500">
              MODULE 5
            </div>
            <div>UNDERSTANDING CHANGES IN BEHAVIOUR</div>
          </div>
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
