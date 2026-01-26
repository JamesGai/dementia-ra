import React, { useState } from "react";
import Button from "../components/universal/Button";
import Segment from "../components/universal/Segment";
import TopBar from "../components/universal/TopBar";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

type CourseSegment = "all" | "progress";

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

  return (
    <div className="p-4 space-y-6">
      <TopBar title="Course" />
      <Segment
        value={segment}
        segmentOptions={courseSegmentOptions}
        setSegment={setSegment}
      />
      <Button text="User Instruction" onClick={handleOpenInstruction} />
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default CoursePage;
