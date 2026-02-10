import React, { useMemo, useState } from "react";
import Button from "../components/universal/Button";
import CourseContent from "../components/course/CourseContent";
import Segment from "../components/universal/Segment";
import { Video } from "../services/videoService";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

export type CourseSegment = "all" | "progress";

export interface CourseItem {
  id: string;
  title: string;
  image: string;
  moduleProgress?: [number, number, number, number, number];
}

interface CoursePageProps {
  onNavigate: (tab: "iSupportNZ") => void;
}

const CoursePage: React.FC<CoursePageProps> = ({ onNavigate }) => {
  const instructionVideo: Video = {
    id: "instruction",
    title: "How to use the Videos page",
    description:
      "This short video explains how to browse videos, play them, and review your watch history.",
    durationText: "02:30",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  };

  const dummyCourses: CourseItem[] = useMemo(
    () => [
      {
        id: "iSupport-NZ",
        title: "iSupport New Zealand",
        image: "iSupport.png",
        moduleProgress: [100, 60, 0, 0, 0],
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
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
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

  return (
    <div className="p-4 space-y-6">
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
        onNavigate={onNavigate}
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
