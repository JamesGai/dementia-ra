import React, { useState } from "react";
import Introduction from "../components/services/Introduction";
import Button from "../components/universal/Button";
import TopBar from "../components/universal/TopBar";
import { VideoItem } from "./VideoPage";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

const ServicesPage: React.FC = () => {
  const instructionVideo: VideoItem = {
    id: "instruction",
    title: "How to use the Service page",
    description:
      "This short video explains how to find a medical centre nearby.",
    duration: "02:30",
    image: "",
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
      <Introduction />
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default ServicesPage;
