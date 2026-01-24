import React from "react";
import AccordionCard from "../universe/AccordionCard";

const ThePurpose: React.FC = () => {
  return (
    <AccordionCard
      title="THE PURPOSE"
    >
      <p className="text-gray-700 leading-relaxed">
        e-DiVA aims to empower carers of people with dementia with an iSupport
        Virtual Assistant. The e-DiVA website allows you to interact with other
        carers, read through educational material, locate support and health
        services and track your appointments. We know it is difficult to find
        the time to go through all the information out there, which is why we
        have collated key functions into e-DiVA.
      </p>
    </AccordionCard>
  );
};

export default ThePurpose;
