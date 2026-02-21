import React, { useRef, useState } from "react";
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
import SearchBar from "../components/home/SearchBar";
import ServiceContent from "../components/service/ServiceContent";
import ServiceModal from "../components/service/ServiceModal";
import AccordionCard from "../components/universal/AccordionCard";
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
    <div className="p-4 space-y-6">
      <SearchBar onSearch={handleSearch} />
      {!hasQuery && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Start typing to search for available resources.
        </div>
      )}
      {hasQuery && loading && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Searching...
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
      {hasQuery && !loading && !error && serviceResults.length > 0 && (
        <ServiceContent
          services={serviceResults}
          openService={handleOpenService}
          title={`SERVICES (${serviceResults.length})`}
        />
      )}
      {hasQuery && !loading && !error && courseModules.length > 0 && (
        <AccordionCard title={`COURSE SECTIONS (${courseModules.length})`}>
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
