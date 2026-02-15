import React from "react";
import { Course } from "../../services/courseService";
import { CourseSegment } from "../../pages/CoursePage";

interface CourseContentProps {
  segment: CourseSegment;
  courses: Course[];
  onNavigate: (tab: "iSupportNZ") => void;
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));
const MODULE_COUNT = 5;
const normalizeProgress = (progress?: number[]) =>
  Array.from({ length: MODULE_COUNT }, (_, idx) => clamp(progress?.[idx] ?? 0));

const CourseContent: React.FC<CourseContentProps> = ({
  segment,
  courses,
  onNavigate,
}) => {
  return (
    <div className="space-y-4">
      {courses.map((c) => {
        const progress = normalizeProgress(c.progress);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onNavigate("iSupportNZ")}
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden text-left active:opacity-90"
          >
            <div className="relative">
              <img
                src={c.thumbnailUrl}
                alt={c.title}
                className="w-full h-40 object-cover"
              />
            </div>
            <div
              className={
                segment === "progress" ? "p-4 space-y-4" : "p-4 space-y-1"
              }
            >
              <div className="text-[#2e6f73] font-extrabold tracking-wide">
                {c.title}
              </div>
              {/* Course progress */}
              {segment === "progress" && (
                <div className="space-y-3">
                  {progress.map((pct, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span className="font-semibold">Module {idx + 1}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#2e6f73] h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default CourseContent;
