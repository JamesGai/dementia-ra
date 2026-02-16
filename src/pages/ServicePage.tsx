import React, { useEffect, useState } from "react";
import { playCircleOutline } from "ionicons/icons";
import { fetchAllServices, Service } from "../services/serviceService";
import { fetchServiceInstructionVideo, Video } from "../services/videoService";
import Introduction from "../components/service/Introduction";
import Button from "../components/universal/Button";
import ServiceContent from "../components/service/ServiceContent";
import ServiceModal from "../components/service/ServiceModal";

import VideoPlayerModal from "../components/video/VideoPlayerModal";

const ServicesPage: React.FC = () => {
  const [instructionVideo, setInstructionVideo] = useState<Video | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    undefined,
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined,
  );

  const handleOpenInstruction = () => {
    if (!instructionVideo) return;
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  const handleOpenService = (service: Service) => {
    setSelectedService(service);
    setIsServiceOpen(true);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [instruction, data] = await Promise.all([
          fetchServiceInstructionVideo(),
          fetchAllServices(),
        ]);
        setServices(data);
        setInstructionVideo(instruction);
      } catch (e) {
        console.error("❌ Failed to fetch services:", e);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <Button
        text="User Instruction"
        icon={playCircleOutline}
        onClick={handleOpenInstruction}
      />
      <Introduction />
      {loading && <p>Loading services...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ServiceContent services={services} openService={handleOpenService} />
      )}
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
      <ServiceModal
        isOpen={isServiceOpen}
        onClose={() => setIsServiceOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
