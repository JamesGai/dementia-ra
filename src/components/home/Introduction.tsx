import React from "react";

const Introduction: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-[#2e6f73]">WELCOME TO E-DIVA</h2>

      <p className="text-gray-700 leading-relaxed">
        Are you currently providing care for someone with dementia? Caring for
        someone with dementia can be both rewarding and challenging. e-DiVA is
        here to support you with a smart, easy-to-use Virtual Assistant designed
        to help you manage the responsibilities of caregiving.
      </p>

      <p className="text-gray-700 leading-relaxed">
        e-DiVA seeks to improve caregiver well-being by offering access to
        educational content and caring information. It aims to educate, provide
        skills, and offer support to carers.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Whether you are looking for practical advice, emotional support, or
        tools to manage daily care, e-DiVA offers:
      </p>

      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>
          <span className="font-semibold">On-demand guidance</span> through
          voice or text search
        </li>
        <li>
          <span className="font-semibold">Culturally tailored resources</span>{" "}
          in multiple languages
        </li>
        <li>
          <span className="font-semibold">Video tutorials</span> to help with
          everyday caregiving tasks
        </li>
        <li>
          <span className="font-semibold">Tips and strategies</span> to reduce
          stress and improve well-being
        </li>
      </ul>
    </div>
  );
};

export default Introduction;
