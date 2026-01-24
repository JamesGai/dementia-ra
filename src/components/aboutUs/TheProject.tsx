import React from "react";
import AccordionCard from "../universe/AccordionCard";

const TheProject: React.FC = () => {
  return (
    <AccordionCard
      title="THE PROJECT"
    >
      <p className="text-gray-700 leading-relaxed">
        Starting in 2021, this project culturally and contextually adapts the
        iSupport for dementia programme, that was developed by The World Health
        Organization (WHO), to fit the healthcare systems in Australia,
        Indonesia, New Zealand, and Vietnam.
      </p>
      <p className="text-gray-700 leading-relaxed">
        To help carers of people with dementia, e-DiVA has implemented the
        following key functions:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>
          <span className="font-semibold">iSupport online course</span> and{" "}
          <span className="font-semibold">Videos</span> to improve caring skills
          and knowledge
        </li>
        <li>
          <span className="font-semibold">Diary</span> to keep everything
          organised
        </li>
        <li>
          <span className="font-semibold">Peer support</span> to connect with
          other carers
        </li>
        <li>
          <span className="font-semibold">Voice search</span>
        </li>
        <li>
          <span className="font-semibold">Recommended content</span> tailored
          based on your caring needs assessment
        </li>
        <li>
          <span className="font-semibold">
            Available dementia care services
          </span>{" "}
          in your area
        </li>
      </ul>
    </AccordionCard>
  );
};

export default TheProject;
