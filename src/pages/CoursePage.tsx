import React, { useState } from "react";
import Segment from "../components/universal/Segment";
import TopBar from "../components/universal/TopBar";

type CourseSegment = "all" | "progress";

const CoursePage: React.FC = () => {
  const courseSegmentOptions = [
    { value: "all", label: "All courses" },
    { value: "progress", label: "My progress" },
  ] as const;

  const [segment, setSegment] = useState<CourseSegment>("all");

  return (
    <div className="p-4 space-y-6">
      <TopBar title="Course" />
      <Segment
        value={segment}
        segmentOptions={courseSegmentOptions}
        setSegment={setSegment}
      />
    </div>
  );
};

export default CoursePage;
