import React from "react";

export type CourseSegment = "all" | "progress";

export interface CourseItem {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  progressPercent?: number;
}

interface CourseContentProps {
  segment: CourseSegment;
  courses: CourseItem[];
  progressCourses: CourseItem[];
  onNavigate: (tab: "iSupportNZ") => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
  segment,
  courses,
  progressCourses,
  onNavigate,
}) => {
  if (segment === "all") {
    return (
      <div className="space-y-4">
        {courses.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onNavigate("iSupportNZ")}
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden text-left active:opacity-90"
          >
            <div className="relative">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4 space-y-1">
              <div className="text-[#2e6f73] font-extrabold tracking-wide">
                {c.title}
              </div>
              {c.subtitle && (
                <div className="text-sm text-gray-600 leading-snug">
                  {c.subtitle}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  }
  // My progress
  if (progressCourses.length > 0) {
    return (
      <div className="space-y-4">
        {progressCourses.map((c) => {
          const pct = Math.max(0, Math.min(100, c.progressPercent ?? 0));
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onNavigate("iSupportNZ")}
              className="w-full bg-white rounded-2xl shadow-md overflow-hidden text-left active:opacity-90"
            >
              <div className="flex items-center gap-4 p-4">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-24 h-16 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="flex-1 space-y-2">
                  <div className="text-[#2e6f73] font-bold">{c.title}</div>
                  {/* progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#2e6f73] h-2 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{pct}% complete</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  }
  // Empty progress
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
      No course progress yet
    </div>
  );
};

export default CourseContent;
