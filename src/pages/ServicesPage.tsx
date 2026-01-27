import React, { useState } from "react";
import AccordionCard from "../components/universal/AccordionCard";
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
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
      <AccordionCard title="WELCOME TO CARE SERVICES">
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            Welcome to our comprehensive resource page dedicated to connecting
            carers with dementia care services.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Living with dementia, or caring for someone who does, can bring a
            range of physical, emotional, and financial challenges. This page
            provides a list of essential dementia care services available in New
            Zealand to support you.
          </p>

          <p className="text-gray-700 leading-relaxed">
            There are various services available to support people caring for
            someone living with dementia.{" "}
            <span className="font-semibold text-[#2e6f73]">
              Needs Assessment and Service Co-ordination (NASC)
            </span>{" "}
            can advise on available support, including government-funded aged
            care services, carer support, in-home support, help with managing
            changed behaviours, and respite care.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Please also check{" "}
            <span className="font-semibold text-[#2e6f73]">
              Alzheimer's New Zealand's directory of available support services
            </span>{" "}
            in your local area.
          </p>

          <p className="text-gray-700 leading-relaxed">
            For more information, please refer to{" "}
            <span className="font-semibold text-[#2e6f73]">
              Module 1.4 "Planning for the future"
            </span>{" "}
            in New Zealand's iSupport course.
          </p>
        </div>
      </AccordionCard>
    </div>
  );
};

export default ServicesPage;
