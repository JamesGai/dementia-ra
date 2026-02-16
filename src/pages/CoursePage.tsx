import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { playCircleOutline } from "ionicons/icons";
import { auth } from "../firebase";
import {
  computeCourseProgress,
  Course,
  fetchAllCourses,
} from "../services/courseService";
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
    const loadCourses = async (uid: string | null) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllCourses();
        if (!uid) {
          setCourses(data);
          return;
        }
        const withComputedProgress = await Promise.all(
          data.map(async (course) => {
            try {
              const progress = await computeCourseProgress({
                courseId: course.id,
                uid,
              });
              if (progress.length === 0) {
                return course;
              }
              return { ...course, progress };
            } catch (progressError) {
              console.error(
                `Failed to compute progress for course ${course.id}`,
                progressError,
              );
              return course;
            }
          }),
        );
        setCourses(withComputedProgress);
      } catch (fetchError) {
        console.error("Failed to fetch courses:", fetchError);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    return onAuthStateChanged(auth, (user) => {
      void loadCourses(user?.uid ?? null);
    });
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
