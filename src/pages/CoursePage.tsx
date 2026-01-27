import React, { useMemo, useState } from "react";
import Button from "../components/universal/Button";
import Segment from "../components/universal/Segment";
import TopBar from "../components/universal/TopBar";
import VideoPlayerModal from "../components/video/VideoPlayerModal";
import CourseContent from "../components/course/CourseContent";

type CourseSegment = "all" | "progress";

export interface CourseItem {
  id: string;
  title: string;
  thumbnail: string;
  subtitle?: string;
  progressPercent?: number;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  src: string;
}

const CoursePage: React.FC = () => {
  const instructionVideo: VideoItem = {
    id: "instruction",
    title: "How to use the Course page",
    description:
      "This short video explains how to start a course module and review your progress.",
    duration: "02:30",
    thumbnail: "",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  };

  const courseSegmentOptions = [
    { value: "all", label: "All courses" },
    { value: "progress", label: "My progress" },
  ] as const;

  const [segment, setSegment] = useState<CourseSegment>("all");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | undefined>(
    undefined,
  );

  const handleOpenInstruction = () => {
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  // Dummy data (replace with real API/data store later)
  const dummyCourses: CourseItem[] = useMemo(
    () => [
      {
        id: "understanding-dementia",
        title: "Understanding Dementia",
        subtitle: "Key concepts and what to expect over time",
        thumbnail:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60",
      },
    ],
    [],
  );

  // Example: progress list could be derived from stored progress records
  const progressCourses: CourseItem[] = useMemo(
    () => [{ ...dummyCourses[0], progressPercent: 35 }],
    [dummyCourses],
  );

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
        onOpenCourse={handleOpenCourse}
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
