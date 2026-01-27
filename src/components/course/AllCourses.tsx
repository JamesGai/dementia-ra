import React from "react";
import { CourseItem } from "../../pages/CoursePage";

interface AllCoursesProps {
  courses: CourseItem[];
  onOpenCourse: () => void;
}

const AllCourses: React.FC<AllCoursesProps> = ({ courses, onOpenCourse }) => {
  return (
    <div className="space-y-4">
      {courses.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={onOpenCourse}
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
          </div>
        </button>
      ))}
    </div>
  );
};

export default AllCourses;
