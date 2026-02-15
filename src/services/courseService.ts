import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export type Course = {
  id: string;
  title: string;
  thumbnailUrl?: string;
  progress?: number[];
};

export type Module = {
  id: string;
  number: number;
  title: string;
  thumbnailUrl?: string;
  description?: string;
};

export type Section = {
  id: string;
  moduleNumber: number;
  sectionNumber: number;
  title: string;
};

export type Subsection = {
  id: string;
  moduleNumber: number;
  sectionNumber: number;
  subsectionNumber: number;
  title: string;
  //   contentFormat?: "text" | "html" | "markdown" | "ref";
  //   content?: string;
};

export async function fetchAllCourses(): Promise<Course[]> {
  const snap = await getDocs(collection(db, "course"));
  return snap.docs.map((doc) => {
    const data = doc.data() as Omit<Course, "id">;
    return {
      id: doc.id,
      ...data,
    };
  });
}

export async function fetchCourseModules(courseId: string): Promise<Module[]> {
  const col = collection(db, "course", courseId, "module");
  const q = query(col, orderBy("number", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title,
      thumbnailUrl: data.thumbnailUrl,
      description: data.description,
      number: data.number,
    };
  });
}

export async function fetchModuleSections(params: {
  courseId: string;
  moduleId: string;
}): Promise<Section[]> {
  const { courseId, moduleId } = params;
  const col = collection(db, "course", courseId, "module", moduleId, "section");
  const q = query(col, orderBy("sectionNumber", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title,
      moduleNumber: data.moduleNumber,
      sectionNumber: data.sectionNumber,
    };
  });
}

export async function fetchSectionSubsections(params: {
  courseId: string;
  moduleId: string;
  sectionId: string;
}): Promise<Subsection[]> {
  const { courseId, moduleId, sectionId } = params;
  const col = collection(
    db,
    "course",
    courseId,
    "module",
    moduleId,
    "section",
    sectionId,
    "subsection",
  );
  const q = query(col, orderBy("subsectionNumber", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Subsection, "id">;
    return {
      id: d.id,
      ...data,
      moduleNumber: data.moduleNumber,
      sectionNumber: data.sectionNumber,
      subsectionNumber: data.subsectionNumber,
    };
  });
}

/**
 * OPTIONAL convenience: fetch everything and build a tree (still using Firestore types only)
 */
export async function fetchCourseTree(courseId: string) {
  const modules = await fetchCourseModules(courseId);
  const sections: Record<string, Section[]> = {};
  const subsections: Record<string, Subsection[]> = {};
  for (const m of modules) {
    const secs = await fetchModuleSections({ courseId, moduleId: m.id }).catch(
      () => [],
    );
    sections[m.id] = secs;
    for (const s of secs) {
      const subs = await fetchSectionSubsections({
        courseId,
        moduleId: m.id,
        sectionId: s.id,
      }).catch(() => []);
      const key = `${m.id}/${s.id}`; // key includes module+section to avoid collisions
      subsections[key] = subs;
    }
  }
  return { modules, sections, subsections };
}
