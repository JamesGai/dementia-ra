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
    </div>
  );
};

export default ISupportNZPage;
