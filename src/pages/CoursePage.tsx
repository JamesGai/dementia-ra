import React, { useMemo, useState } from "react";
import Button from "../components/universal/Button";
import CourseContent, {
  CourseSegment,
  CourseItem,
} from "../components/course/CourseContent";
import Segment from "../components/universal/Segment";
import TopBar from "../components/universal/TopBar";
import { VideoItem } from "../components/video/VideoContent";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

const CoursePage: React.FC = () => {
  const instructionVideo: VideoItem = {
    id: "instruction",
    title: "How to use the Course page",
    description:
      "This short video explains how to start a course module and review your progress.",
    duration: "02:30",
    image: "",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  };

  const dummyCourses: CourseItem[] = useMemo(
    () => [
      {
        id: "iSupport-NZ",
        title: "iSupport New Zealand",
        subtitle:
          "iSupport NZ is a self-help skills and training programme wtih 5 moduiles for carers of people living with dementia. It aims to prevent and/or decrease mental and physical health problems associated with caregiving and to improve the quality of life of people (family carers) living with dementia.",
        image: "iSupport.png",
      },
    ],
    [],
  );

  const courseSegmentOptions = [
    { value: "all", label: "All courses" },
    { value: "progress", label: "My progress" },
  ] as const;

  const [segment, setSegment] = useState<CourseSegment>("all");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | undefined>(
    undefined,
  );

  const progressCourses: CourseItem[] = useMemo(
    () => [{ ...dummyCourses[0], progressPercent: 35 }],
    [dummyCourses],
  );

  const handleOpenInstruction = () => {
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  const handleOpenCourse = (course: CourseItem) => {
    console.log("hi");
  };

  return (
    <div className="p-4 space-y-6">
      <TopBar title="Course" />
      <Segment
        value={segment as CourseSegment}
        segmentOptions={courseSegmentOptions}
        setSegment={setSegment}
      />
      <Button text="User Instruction" onClick={handleOpenInstruction} />
      <CourseContent
        segment={segment as CourseSegment}
        courses={dummyCourses}
        progressCourses={progressCourses}
        startCourse={handleOpenCourse}
      />
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default CoursePage;
