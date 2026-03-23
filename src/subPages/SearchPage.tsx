import React, { useRef, useState } from "react";
import { searchOutline } from "ionicons/icons";
import { useSpeechToText } from "../hooks/useSpeechToText";
import {
  Module,
  searchCourseSections,
  Section,
  Subsection,
} from "../services/courseService";
import { searchServices, Service } from "../services/serviceService";
import { searchVideos, Video } from "../services/videoService";
import CourseTitle from "../components/course/CourseTitle";
import SectionList from "../components/course/SectionList";
import SubsectionModal from "../components/course/SubsectionModal";
import ServiceContent from "../components/service/ServiceContent";
import ServiceModal from "../components/service/ServiceModal";
import AccordionCard from "../components/universal/AccordionCard";
import InputBar from "../components/universal/InputBar";
import LoadingOverlay from "../components/universal/LoadingOverlay";
import VideoContent from "../components/video/VideoContent";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

const DEFAULT_COURSE_ID = "isupport-nz";

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
  const [courseModules, setCourseModules] = useState<Module[]>([]);
  const [courseSections, setCourseSections] = useState<
    Record<string, Section[]>
  >({});
  const [courseSubsections, setCourseSubsections] = useState<
    Record<string, Subsection[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<
    Subsection | undefined
  >();
  const [isSubsectionOpen, setIsSubsectionOpen] = useState(false);

  const requestIdRef = useRef(0);
  const {
    error: voiceError,
    isListening: isVoiceListening,
    isSupported: isVoiceSupported,
    toggleListening,
  } = useSpeechToText({
    onResult: (transcript) => {
      void handleSearch(transcript);
    },
  });

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    const trimmed = value.trim();
    if (!trimmed) {
      requestIdRef.current += 1;
      setLoading(false);
      setError(null);
      setVideoResults([]);
      setServiceResults([]);
      setCourseModules([]);
      setCourseSections({});
      setCourseSubsections({});
      return;
    }
    const requestId = ++requestIdRef.current;
    try {
      setLoading(true);
      setError(null);
      const [videoData, serviceData, courseData] = await Promise.all([
        searchVideos(trimmed),
        searchServices(trimmed),
        searchCourseSections(DEFAULT_COURSE_ID, trimmed),
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
      setCourseModules(
        [...courseData.modules].sort((a, b) => a.number - b.number),
      );
      setCourseSections(courseData.sections);
      setCourseSubsections(courseData.subsections);
    } catch (e) {
      console.error("Failed to search videos/services/courses:", e);
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

  const handleOpenService = (service: Service) => {
    setSelectedService(service);
    setIsServiceOpen(true);
  };

  const handleOpenSubsection = (sub: Subsection) => {
    setSelectedSubsection(sub);
    setIsSubsectionOpen(true);
  };

  const hasQuery = Boolean(searchTerm.trim());

  return (
    <div className="space-y-6 p-4 pt-15">
      <InputBar
        placeholder="Search resources..."
        leftIcon={searchOutline}
        value={searchTerm}
        onChange={handleSearch}
        onSubmit={() => void handleSearch(searchTerm)}
        onVoiceInput={() => toggleListening(searchTerm)}
        isVoiceListening={isVoiceListening}
        isVoiceSupported={isVoiceSupported}
        voiceError={voiceError}
      />
      {!hasQuery && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Start typing to search for videos, course content, and dementia
          services nearby.
        </div>
      )}
      {hasQuery && loading && <LoadingOverlay text="Searching..." />}
      {hasQuery && error && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-red-600">
          {error} Please also check if you are already logged in.
        </div>
      )}
      {hasQuery &&
        !loading &&
        !error &&
        videoResults.length === 0 &&
        serviceResults.length === 0 &&
        courseModules.length === 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
            No results found for "{searchTerm.trim()}".
          </div>
        )}
      {hasQuery && !loading && !error && videoResults.length > 0 && (
        <AccordionCard title={`VIDEOS (${videoResults.length})`}>
          <VideoContent
            segment="all"
            videos={videoResults}
            historyVideos={[]}
            playVideo={handleOpenVideo}
          />
        </AccordionCard>
      )}
      {hasQuery && !loading && !error && courseModules.length > 0 && (
        <AccordionCard title={`COURSE MODULES (${courseModules.length})`}>
          <div className="space-y-3">
            {courseModules.map((module) => (
              <AccordionCard
                key={module.id}
                title={
                  <CourseTitle
                    variant="module"
                    number={module.number.toString()}
                    title={module.title}
                    thumbnailUrl={module.thumbnailUrl}
                  />
                }
              >
                <SectionList
                  moduleId={module.id}
                  sections={courseSections[module.id] ?? []}
                  subsections={courseSubsections}
                  openSubsection={handleOpenSubsection}
                />
              </AccordionCard>
            ))}
          </div>
        </AccordionCard>
      )}
      {hasQuery && !loading && !error && serviceResults.length > 0 && (
        <ServiceContent
          services={serviceResults}
          openService={handleOpenService}
          title={`SERVICES (${serviceResults.length})`}
        />
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
      <SubsectionModal
        isOpen={isSubsectionOpen}
        onClose={() => setIsSubsectionOpen(false)}
        subsection={selectedSubsection}
      />
    </div>
  );
};

export default SearchPage;
