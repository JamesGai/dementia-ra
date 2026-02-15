import React, { useEffect, useState } from "react";
import {
  fetchCourseTree,
  Module,
  Section,
  Subsection,
} from "../services/courseService";
import AccordionCard from "../components/universal/AccordionCard";
import CourseTitle from "../components/course/CourseTitle";
import SubSectionList from "../components/course/SubSectionList";
import SubsectionModal from "../components/course/SubsectionModal";

export type SectionItem = {
  number: string;
  title: string;
  subsections?: SubsectionItem[];
};

export type SubsectionItem = {
  number: string;
  title: string;
};

const ISupportNZPage: React.FC = () => {
  const courseId = "isupport-nz";
  const [modules, setModules] = useState<Module[]>([]);
  const [sectionsByModuleId, setSectionsByModuleId] = useState<
    Record<string, Section[]>
  >({});
  const [subsectionsBySectionPath, setSubsectionsBySectionPath] = useState<
    Record<string, Subsection[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubsectionOpen, setIsSubsectionOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<
    SubsectionItem | undefined
  >(undefined);

  const handleOpenSubsection = (sub: SubsectionItem) => {
    setSelectedSubsection(sub);
    setIsSubsectionOpen(true);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { modules, sectionsByModuleId, subsectionsBySectionPath } =
          await fetchCourseTree(courseId);
        setModules(modules);
        setSectionsByModuleId(sectionsByModuleId);
        setSubsectionsBySectionPath(subsectionsBySectionPath);
        console.log(
          "Sections object keys:",
          Object.keys(sectionsByModuleId).length,
        );
        console.log(
          "Subsections object keys:",
          Object.keys(subsectionsBySectionPath).length,
        );
        console.log("Sections full object:", sectionsByModuleId);
        console.log("Subsections full object:", subsectionsBySectionPath);
      } catch (err) {
        console.error(err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-4 space-y-6">
      {loading && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-gray-600">
          Loading modules...
        </div>
      )}
      {error && (
        <div className="bg-white rounded-2xl p-6 shadow-md text-sm text-red-600">
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          {modules.map((m) => (
            <AccordionCard
              key={m.id}
              title={
                <CourseTitle
                  variant="module"
                  number={m.number.toString()}
                  title={m.title}
                  thumbnailUrl={m.thumbnailUrl}
                />
              }
            >
              {m.number === 0 && m.description && (
                <p className="title-sm title-gray-700 leading-relaxed">
                  {m.description}
                </p>
              )}
              {m.number !== 0 && (
                <p className="text-sm text-gray-500">
                  Sections will be loaded here...
                </p>
                // <SubSectionList
                //   sections={m.sections}
                //   openSubsection={handleOpenSubsection}
                // />
              )}
            </AccordionCard>
          ))}
          <AccordionCard title="NEW ZEALAND LOCAL RESOURCES">
            <></>
          </AccordionCard>
        </>
      )}
      <SubsectionModal
        isOpen={isSubsectionOpen}
        onClose={() => setIsSubsectionOpen(false)}
        subsection={selectedSubsection}
      />
    </div>
  );
};

export default ISupportNZPage;
