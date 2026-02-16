import React, { useEffect, useState } from "react";
import { playCircleOutline } from "ionicons/icons";
import { auth } from "../firebase";
import {
  computeCourseProgress,
  Course,
  fetchAllCourses,
} from "../services/courseService";
import { fetchCourseInstructionVideo, Video } from "../services/videoService";
import Button from "../components/universal/Button";
import CourseContent from "../components/course/CourseContent";
import Segment from "../components/universal/Segment";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

export type CourseSegment = "all" | "progress";

interface CoursePageProps {
  onNavigate: (tab: "iSupportNZ") => void;
}

const CoursePage: React.FC<CoursePageProps> = ({ onNavigate }) => {
  const courseSegmentOptions = [
    { value: "all", label: "All courses" },
    { value: "progress", label: "My progress" },
  ] as const;

  const [segment, setSegment] = useState<CourseSegment>("all");
  const [instructionVideo, setInstructionVideo] = useState<Video | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    undefined,
  );
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenInstruction = () => {
    if (!instructionVideo) return;
    setSelectedVideo(instructionVideo);
    setIsVideoOpen(true);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [instruction, data] = await Promise.all([
          fetchCourseInstructionVideo(),
          fetchAllCourses(),
        ]);
        setInstructionVideo(instruction);
        const uid = auth.currentUser?.uid ?? null;
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
