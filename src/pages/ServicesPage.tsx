import React, { useState } from "react";
import Introduction from "../components/services/Introduction";
import Button from "../components/universal/Button";
import ServicesContent from "../components/services/ServicesContent";
import ServicesModal from "../components/services/ServicesModal";
import TopBar from "../components/universal/TopBar";
import { VideoItem } from "./VideoPage";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

export type Service = {
  id: string;
  title: string;
  description?: string;
  address: string;
  link: string;
  email: string;
  mobile: string;
};

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

  const services: Service[] = [
    {
      id: "nasc-northland",
      title: "NASC - Northland",
      description: "",
      address:
        "Health of Older People, Te Whatu Ora Te Tai Tokerau, Northland DHB, Private Bag 9742",
      link: "https://www.seniorline.org.nz/local-services/northland/",
      email: "nasc@northlanddhb.org.nz",
      mobile: "09 430 4131 or 0800 88 88 90",
    },
    {
      id: "nasc-capital-and-coast",
      title:
        "NASC - Capital and Coast (Capital and Coast Care Coordination Centre)",
      description: "",
      address: "PO Box 50-544, Porirua 5240 Level 1, 13 Marina View, Mana 5026",
      link: "https://www.seniorline.org.nz/local-services/capital-and-coast/",
      email: "wellington@careco.org.nz",
      mobile: "04 238 2020 or 0800 282 200",
    },
    {
      id: "nasc-southland",
      title: "NASC - Southland (Southland Care Coordination Centre)",
      description: "",
      address:
        "Southland District Health Board (Southland), Kew Road, PO Box 828, Invercargill 9812",
      link: "https://www.healthpoint.co.nz/public/older-peoples-health/needs-assessment-care-coordination-southland/",
      email: "CareCoordinationSTH@southerndhb.govt.nz",
      mobile: "0800 223 225 or 03 214 5725",
    },
    {
      id: "tautoko-suicide-crisis-helpline",
      title: "0508 TAUTOKO Suicide Crisis Helpline",
      description:
        "A free, nationwide service available 24 hours a day, 7 days a week. TAUTOKO is operated by trained and experienced social service practitioners who have undergone suicide prevention training. If you think you, or someone you know, may be thinking about suicide, call the Suicide Crisis Helpline for support. If either you, or someone you know, is in immediate danger, please call emergency services immediately on 111.",
      address: "95 Great South Road, Epsom, Auckland, 1051",
      link: "https://www.lifeline.org.nz/services/suicide-crisis-helpline",
      email: "office@lifeline.org.nz",
      mobile: "0508 828 865",
    },
    {
      id: "alzheimers-tauranga-western-bay-of-plenty",
      title: "Alzheimers Tauranga/Western Bay of Plenty",
      description:
        "Alzheimers Tauranga/Western Bay of Plenty provides support, education, information, and related services directly to those affected by dementia mate wareware. These services include but are not limited to: Information and education to assist with understanding and living with dementia Support for whānau and friends coping with the demands of caring Support groups and day programmes for people affected by dementia mate wareware",
      address: "116 Thirteenth Avenue, Tauranga 3112",
      link: "https://alzheimers.org.nz/tauranga/",
      email: "tauranga@alzheimers.org.nz",
      mobile: "(07) 577 6344",
    },
    {
      id: "alzheimers-taranaki",
      title: "Alzheimers Taranaki",
      description:
        "Alzheimers Taranaki provides support, education, information, and related services directly to those affected by dementia mate wareware. These services include but are not limited to: Information and education to assist with understanding and living with dementia Support for whānau and friends coping with the demands of caring Support groups and day programmes for people affected by dementia mate wareware",
      address: "14 Manakohi St, Spotswood, New Plymouth 4310",
      link: "https://alzheimers.org.nz/taranaki/",
      email: "admin.taranaki@alzheimers.org.nz",
      mobile: "(06) 769-6916",
    },
  ];

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | undefined>(
    undefined,
  );
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined,
  );

  const handleOpenInstruction = () => {
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  const handleOpenService = (service: Service) => {
    setSelectedService(service);
    setIsServiceOpen(true);
  };

  return (
    <div className="p-4 space-y-6">
      <TopBar title="Dementia services" />
      <Button text="User Instruction" onClick={handleOpenInstruction} />
      <Introduction />
      <ServicesContent services={services} openService={handleOpenService} />
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
      <ServicesModal
        isOpen={isServiceOpen}
        onClose={() => setIsServiceOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
