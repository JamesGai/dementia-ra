import React, { useRef, useState } from "react";
import { searchServices, Service } from "../services/serviceService";
import { searchVideos, Video } from "../services/videoService";
import SearchBar from "../components/home/SearchBar";
import VideoContent from "../components/video/VideoContent";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

const toMillis = (createdAt: any): number => {
  if (!createdAt) return 0;
  if (typeof createdAt?.toDate === "function") {
    return createdAt.toDate().getTime();
  }
  if (createdAt instanceof Date) {
    return createdAt.getTime();
  }
  const d = new Date(createdAt);
  if (!Number.isNaN(d.getTime())) {
    return d.getTime();
  }
  return 0;
};

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videoResults, setVideoResults] = useState<Video[]>([]);
  const [serviceResults, setServiceResults] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const requestIdRef = useRef(0);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    const trimmed = value.trim();

    if (!trimmed) {
      requestIdRef.current += 1;
      setLoading(false);
      setError(null);
      setVideoResults([]);
      setServiceResults([]);
      return;
    }

    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);
      setError(null);
      const [videoData, serviceData] = await Promise.all([
        searchVideos(trimmed),
        searchServices(trimmed),
      ]);

      if (requestId !== requestIdRef.current) {
        return;
      }

      const sortedVideos = [...videoData].sort(
        (a, b) =>
          toMillis((b as any).createdAt) - toMillis((a as any).createdAt),
      );
      const sortedServices = [...serviceData].sort((a, b) =>
        a.name.localeCompare(b.name),
      );

      setVideoResults(sortedVideos);
      setServiceResults(sortedServices);
      console.log("Service search results:", sortedServices);
    } catch (e) {
      console.error("Failed to search videos/services:", e);
      if (requestId === requestIdRef.current) {
        setError("Failed to search results. Please try again.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  const handleOpenVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsVideoOpen(true);
  };

  const hasQuery = Boolean(searchTerm.trim());

  return (
    <div className="p-4 space-y-6">
      <SearchBar onSearch={handleSearch} />

      {!hasQuery && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Start typing to search for videos and services.
        </div>
      )}

      {hasQuery && loading && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Searching videos and services...
        </div>
      )}

      {hasQuery && error && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-red-600">
          {error}
        </div>
      )}

      {hasQuery &&
        !loading &&
        !error &&
        videoResults.length === 0 &&
        serviceResults.length === 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
            No results found for "{searchTerm.trim()}".
          </div>
        )}

      {hasQuery && !loading && !error && videoResults.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[#2e6f73] font-extrabold tracking-wide">
            Videos
          </h2>
          <VideoContent
            segment="all"
            videos={videoResults}
            historyVideos={[]}
            playVideo={handleOpenVideo}
          />
        </div>
      )}

      {hasQuery && !loading && !error && serviceResults.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[#2e6f73] font-extrabold tracking-wide">
            Services
          </h2>
          <div className="space-y-3">
            {serviceResults.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-4 shadow-md space-y-2"
              >
                <div className="text-[#2e6f73] font-extrabold tracking-wide">
                  {service.name}
                </div>
                {service.description ? (
                  <p className="text-sm text-gray-700">{service.description}</p>
                ) : null}
                <p className="text-sm text-gray-600">{service.address}</p>
                <p className="text-sm text-gray-600">{service.phone}</p>
                <p className="text-sm text-gray-600">{service.email}</p>
                {service.link ? (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#2e6f73] underline break-words"
                  >
                    {service.link}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default SearchPage;
