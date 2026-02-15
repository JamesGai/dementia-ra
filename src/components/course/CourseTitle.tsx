import React from "react";

interface CourseTitleProps {
  number: string;
  title: string;
  variant: "module" | "section";
  thumbnailUrl?: string; // Module only
}

const CourseTitle: React.FC<CourseTitleProps> = ({
  number,
  title,
  variant,
  thumbnailUrl,
}) => {
  const isModule = variant === "module";

  return (
    <div className={`leading-tight ${isModule ? "py-3" : "py-2"}`}>
      {isModule && thumbnailUrl && (
        <img
          src={thumbnailUrl}
          className="mb-3 w-full rounded-xl object-cover"
        />
      )}
      <div
        className={`font-semibold tracking-widest ${
          isModule ? "text-xs text-gray-500" : "text-[11px] text-gray-400"
        }`}
      >
        {isModule ? "MODULE" : "SECTION"} {number}.
      </div>
      <div
        className={`${
          isModule
            ? "text-[#2e6f73] font-extrabold text-lg"
            : "text-gray-700 font-bold text-base"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default CourseTitle;
