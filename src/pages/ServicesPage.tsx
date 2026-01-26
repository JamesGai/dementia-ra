import React, { useState } from "react";
import TopBar from "../components/universal/TopBar";
import Button from "../components/universal/Button";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  src: string;
}

const ServicesPage: React.FC = () => {
  const instructionVideo: VideoItem = {
    id: "instruction",
    title: "How to use the Service page",
    description:
      "This short video explains how to find a medical centre nearby.",
    duration: "02:30",
    thumbnail: "",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  };

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
      <TopBar title="Dementia services" />
      <Button text="User Instruction" onClick={handleOpenInstruction} />
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default ServicesPage;
