import React from "react";
import TopBar from "../components/universal/TopBar";
import Segment from "../components/video/Segment";
import Button from "../components/universal/Button";

const ServicesPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <TopBar title="Videos" />
      {/* <Segment value={segment} onChange={setSegment} />
      <Button text="User Instruction" onClick={handleOpenInstruction} /> */}
    </div>
  );
};

export default ServicesPage;
