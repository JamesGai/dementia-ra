import React from "react";
import type { CourseItem } from "../../pages/CoursePage";

interface MyProgressProps {
  progressCourses: CourseItem[];
  onOpenCourse: () => void;
}

const MyProgress: React.FC<MyProgressProps> = ({
  progressCourses,
  onOpenCourse,
}) => {
  return (
    <div className="space-y-4">
      {progressCourses.map((c) => {
        const pct = Math.max(0, Math.min(100, c.progressPercent ?? 0));
        return (
          <button
            key={c.id}
            type="button"
            onClick={onOpenCourse}
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
};

export default MyProgress;
