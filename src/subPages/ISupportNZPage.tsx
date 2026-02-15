import React, { useEffect, useState } from "react";
import {
  fetchCourseTree,
  Module,
  Section,
  Subsection,
} from "../services/courseService";
import AccordionCard from "../components/universal/AccordionCard";
import CourseTitle from "../components/course/CourseTitle";
import SubSectionList from "../components/course/SectionList";
import SubsectionModal from "../components/course/SubsectionModal";

const ISupportNZPage: React.FC = () => {
  const courseId = "isupport-nz";
  const [modules, setModules] = useState<Module[]>([]);
  // <Module ID, Section objects>
  const [sections, setSectionsByModuleId] = useState<Record<string, Section[]>>(
    {},
  );
  // <Section ID, Subsection objects>
  const [subsections, setSubsectionsBySectionPath] = useState<
    Record<string, Subsection[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubsectionOpen, setIsSubsectionOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<
    Subsection | undefined
  >(undefined);

  const handleOpenSubsection = (sub: Subsection) => {
    setSelectedSubsection(sub);
    setIsSubsectionOpen(true);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { modules, sections, subsections } =
          await fetchCourseTree(courseId);
        setModules(modules);
        setSectionsByModuleId(sections);
        setSubsectionsBySectionPath(subsections);
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
                <SubSectionList
                  moduleId={m.id}
                  sections={sections[m.id] || []}
                  subsections={subsections}
                  openSubsection={handleOpenSubsection}
                />
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
