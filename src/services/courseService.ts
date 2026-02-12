import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export type Course = {
  id: string;
  title: string;
  thumbnailUrl?: string;
};

export type Module = {
  id: string;
  number: number;
  title: string;
  thumbnailUrl?: string;
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

const toNum = (v: unknown, fallback = 0) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
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
    const data = d.data() as Omit<Module, "id">;
    return {
      id: d.id,
      ...data,
      number: toNum((data as any).number),
      order:
        (data as any).order != null ? toNum((data as any).order) : undefined,
    };
  });
}

export async function fetchModuleSections(params: {
  courseId: string;
  moduleId: string;
}): Promise<Section[]> {
  const { courseId, moduleId } = params;
  const col = collection(
    db,
    "course",
    courseId,
    "module",
    moduleId,
    "sections",
  );
  const q = query(col, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Section, "id">;
    return {
      id: d.id,
      ...data,
      moduleNumber: toNum((data as any).moduleNumber),
      sectionNumber: toNum((data as any).sectionNumber),
      order: toNum((data as any).order),
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
    "sections",
    sectionId,
    "subsections",
  );
  const q = query(col, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Subsection, "id">;
    return {
      id: d.id,
      ...data,
      moduleNumber: toNum((data as any).moduleNumber),
      sectionNumber: toNum((data as any).sectionNumber),
      subsectionNumber: toNum((data as any).subsectionNumber),
      order: toNum((data as any).order),
    };
  });
}

/**
 * OPTIONAL convenience: fetch everything and build a tree (still using Firestore types only)
 */
export async function fetchCourseTree(courseId: string) {
  const modules = await fetchCourseModules(courseId);
  const sectionsByModuleId: Record<string, Section[]> = {};
  const subsectionsBySectionPath: Record<string, Subsection[]> = {};
  for (const m of modules) {
    const secs = await fetchModuleSections({ courseId, moduleId: m.id }).catch(
      () => [],
    );
    sectionsByModuleId[m.id] = secs;
    for (const s of secs) {
      const subs = await fetchSectionSubsections({
        courseId,
        moduleId: m.id,
        sectionId: s.id,
      }).catch(() => []);
      const key = `${m.id}/${s.id}`; // key includes module+section to avoid collisions
      subsectionsBySectionPath[key] = subs;
    }
  }
  return { modules, sectionsByModuleId, subsectionsBySectionPath };
}
