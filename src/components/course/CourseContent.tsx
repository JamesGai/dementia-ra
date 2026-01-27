import React from "react";
import AllCourses from "./AllCourses";
import { CourseSegment, CourseItem } from "../../pages/CoursePage";
import MyProgress from "./MyProgress";

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
      <AllCourses
        courses={courses}
        onOpenCourse={() => onNavigate("iSupportNZ")}
      />
    );
  }
  if (progressCourses.length > 0) {
    return (
      <MyProgress
        courses={progressCourses}
        onOpenCourse={() => onNavigate("iSupportNZ")}
      />
    );
  }
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md text-center text-sm text-gray-500">
      No course progress yet
    </div>
  );
};

export default CourseContent;
