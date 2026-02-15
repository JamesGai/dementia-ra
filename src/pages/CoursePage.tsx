import React, { useEffect, useState } from "react";
import { playCircleOutline } from "ionicons/icons";
import { Course, fetchAllCourses } from "../services/courseService";
import { Video } from "../services/videoService";
import Button from "../components/universal/Button";
import CourseContent from "../components/course/CourseContent";
import Segment from "../components/universal/Segment";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

export type CourseSegment = "all" | "progress";

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

  const courseSegmentOptions = [
    { value: "all", label: "All courses" },
    { value: "progress", label: "My progress" },
  ] as const;

  const [segment, setSegment] = useState<CourseSegment>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    undefined,
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenInstruction = () => {
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllCourses();
        setCourses(data);
      } catch (e) {
        console.error("❌ Failed to fetch courses:", e);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <Segment
        value={segment}
        segmentOptions={courseSegmentOptions}
        setSegment={setSegment}
      />
      <Button
        text="User Instruction"
        icon={playCircleOutline}
        onClick={handleOpenInstruction}
      />
      {loading && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Loading courses...
        </div>
      )}
      {error && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-red-600">
          {error}
        </div>
      )}
      {!loading && !error && (
        <CourseContent
          segment={segment}
          courses={courses}
          onNavigate={onNavigate}
        />
      )}
      <VideoPlayerModal
        isVideoOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default CoursePage;
