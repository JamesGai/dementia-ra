import React from "react";
import type { CourseItem } from "../../pages/CoursePage";

interface MyProgressProps {
  courses: CourseItem[];
  onOpenCourse: () => void;
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const MyProgress: React.FC<MyProgressProps> = ({ courses, onOpenCourse }) => {
  return (
    <div className="space-y-4">
      {courses.map((c) => {
        // fallback if moduleProgress not provided yet
        const progress: number[] = (c.moduleProgress ?? [0, 0, 0, 0, 0]).map(
          clamp,
        );
        return (
          <button
            key={c.id}
            type="button"
            onClick={onOpenCourse}
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden text-left active:opacity-90"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
            {/* Content */}
            <div className="p-4 space-y-4">
              <div className="text-[#2e6f73] font-extrabold tracking-wide">
                {c.title}
              </div>
              {/* 5 module progress bars */}
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
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MyProgress;
