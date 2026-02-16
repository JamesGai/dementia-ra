import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  markSubsectionCompleted,
  fetchCourseTree,
  Module,
  Section,
  Subsection,
} from "../services/courseService";
import AccordionCard from "../components/universal/AccordionCard";
import CourseTitle from "../components/course/CourseTitle";
import SectionList from "../components/course/SectionList";
import SubsectionModal from "../components/course/SubsectionModal";

const ISupportNZPage: React.FC = () => {
  const courseId = "isupport-nz";
  const [modules, setModules] = useState<Module[]>([]);
  // <Module ID, Section objects>
  const [sections, setSections] = useState<Record<string, Section[]>>({});
  // <Section ID, Subsection objects>
  const [subsections, setSubsections] = useState<Record<string, Subsection[]>>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubsectionOpen, setIsSubsectionOpen] = useState(false);
  const [selectedSubsection, setSelectedSubsection] = useState<
    Subsection | undefined
  >(undefined);

  const handleOpenSubsection = (sub: Subsection) => {
    setSelectedSubsection(sub);
    setIsSubsectionOpen(true);
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    void markSubsectionCompleted({
      uid,
      moduleNumber: sub.moduleNumber,
      sectionNumber: sub.sectionNumber,
      subsectionNumber: sub.subsectionNumber,
    }).catch((err) => {
      console.error("Failed to save subsection completion", err);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { modules, sections, subsections } =
          await fetchCourseTree(courseId);
        setModules(modules);
        setSections(sections);
        setSubsections(subsections);
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
              {/* Introduction module */}
              {m.number === 0 && m.description && (
                <p className="title-sm title-gray-700 leading-relaxed">
                  {m.description}
                </p>
              )}
              {/* Standard module */}
              {m.number !== 0 && (
                <SectionList
                  moduleId={m.id}
                  sections={sections[m.id] || []}
                  subsections={subsections}
                  openSubsection={handleOpenSubsection}
                />
              )}
            </AccordionCard>
          ))}
          <AccordionCard title="NEW ZEALAND LOCAL RESOURCES">
            <div className="title-sm title-gray-500 py-2">
              More resources are coming soon!
            </div>
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
