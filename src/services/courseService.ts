import {
  arrayUnion,
  collection,
  collectionGroup,
  getDoc,
  getDocs,
  orderBy,
  query,
  doc,
  setDoc,
  where,
} from "firebase/firestore";
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

export type ContentBlock = {
  type: "heading" | "subheading" | "paragraph";
  text: string;
};

export type Subsection = {
  id: string;
  moduleNumber: number;
  sectionNumber: number;
  subsectionNumber: number;
  title: string;
  content?: ContentBlock[];
};

const DEFAULT_PROGRESS_MODULE_COUNT = 5;
let canUseSectionCollectionGroupQuery = true;

/**
 * Builds a subsection progress token in the format `module.section.subsection`.
 * Example: `1.1.0`.
 */
export function buildSubsectionProgressKey(params: {
  moduleNumber: number;
  sectionNumber: number;
  subsectionNumber: number;
}) {
  const { moduleNumber, sectionNumber, subsectionNumber } = params;
  return `${moduleNumber}.${sectionNumber}.${subsectionNumber}`;
}

/**
 * Marks a subsection as completed by adding its token into `users/{uid}.courseProgress`.
 * Uses `arrayUnion` so duplicates are ignored automatically.
 */
export async function markSubsectionCompleted(params: {
  uid: string;
  moduleNumber: number;
  sectionNumber: number;
  subsectionNumber: number;
}): Promise<void> {
  const { uid, moduleNumber, sectionNumber, subsectionNumber } = params;
  const token = buildSubsectionProgressKey({
    moduleNumber,
    sectionNumber,
    subsectionNumber,
  });
  const userRef = doc(db, "users", uid);

  await setDoc(
    userRef,
    {
      courseProgress: arrayUnion(token),
    },
    { merge: true },
  );
}

/**
 * Reads `users/{uid}.courseProgress` and returns it as a set for O(1) lookups.
 */
async function fetchCompletedSubsectionKeySet(params: {
  uid: string;
}): Promise<Set<string>> {
  const { uid } = params;
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    return new Set();
  }
  const data = snap.data() as { courseProgress?: unknown };
  const list = Array.isArray(data.courseProgress) ? data.courseProgress : [];
  const keys = list.filter((item): item is string => typeof item === "string");
  return new Set(keys);
}

/**
 * Computes per-module completion percentages for a course.
 * Percentage per module is:
 * `Math.round(completedSubsections / totalSubsections * 100)`.
 * Returns an array padded to `moduleCount` (default 5) when trackable subsections exist.
 * Returns `[]` if no trackable subsections are found, so callers can keep existing progress data.
 */
export async function computeCourseProgress(params: {
  courseId: string;
  uid: string;
  moduleCount?: number;
}): Promise<number[]> {
  const { courseId, uid, moduleCount = DEFAULT_PROGRESS_MODULE_COUNT } = params;

  const [{ modules, sections, subsections }, completedKeys] = await Promise.all(
    [fetchCourseTree(courseId), fetchCompletedSubsectionKeySet({ uid })],
  );

  const trackableModules = modules
    .filter((m) => m.number > 0)
    .sort((a, b) => a.number - b.number)
    .slice(0, moduleCount);

  let totalTrackableSubsections = 0;

  const progress = trackableModules.map((m) => {
    const moduleSections = sections[m.id] ?? [];
    let totalSubsections = 0;
    let completedSubsections = 0;

    for (const s of moduleSections) {
      const key = `${m.id}/${s.id}`;
      const sectionSubs = subsections[key] ?? [];
      for (const sub of sectionSubs) {
        totalSubsections += 1;
        const subKey = buildSubsectionProgressKey({
          moduleNumber: sub.moduleNumber,
          sectionNumber: sub.sectionNumber,
          subsectionNumber: sub.subsectionNumber,
        });
        if (completedKeys.has(subKey)) {
          completedSubsections += 1;
        }
      }
    }

    totalTrackableSubsections += totalSubsections;
    if (totalSubsections === 0) return 0;
    return Math.round((completedSubsections / totalSubsections) * 100);
  });

  if (totalTrackableSubsections === 0) {
    return [];
  }

  while (progress.length < moduleCount) {
    progress.push(0);
  }

  return progress;
}

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

export async function fetchSubsectionDetail(params: {
  courseId: string;
  moduleId: string;
  sectionId: string;
  subsectionId: string;
}): Promise<Subsection | null> {
  const { courseId, moduleId, sectionId, subsectionId } = params;
  const ref = doc(
    db,
    "course",
    courseId,
    "module",
    moduleId,
    "section",
    sectionId,
    "subsection",
    subsectionId,
  );
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return null;
  }
  const data = snap.data() as Omit<Subsection, "id">;
  return {
    id: snap.id,
    ...data,
    moduleNumber: data.moduleNumber,
    sectionNumber: data.sectionNumber,
    subsectionNumber: data.subsectionNumber,
    title: data.title,
    content: Array.isArray(data.content) ? data.content : [],
  };
}

export async function searchCourseSections(
  courseId: string,
  searchTerm: string,
) {
  if (!searchTerm.trim()) {
    return { modules: [], sections: {}, subsections: {} };
  }
  const formatted = searchTerm.trim().toLowerCase();

  const fromSectionDoc = (docSnap: any): Section => {
    const sectionData = docSnap.data();
    return {
      id: docSnap.id,
      title: sectionData.title,
      moduleNumber: sectionData.moduleNumber,
      sectionNumber: sectionData.sectionNumber,
    };
  };

  const fetchSubsections = async (moduleId: string, sectionId: string) => {
    const subsectionCol = collection(
      db,
      "course",
      courseId,
      "module",
      moduleId,
      "section",
      sectionId,
      "subsection",
    );
    const subsectionSnap = await getDocs(
      query(subsectionCol, orderBy("subsectionNumber", "asc")),
    );
    return subsectionSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title,
        moduleNumber: data.moduleNumber,
        sectionNumber: data.sectionNumber,
        subsectionNumber: data.subsectionNumber,
      } as Subsection;
    });
  };

  if (canUseSectionCollectionGroupQuery) {
    try {
      const q = query(
        collectionGroup(db, "section"),
        where("keywords", "array-contains", formatted),
      );
      const snap = await getDocs(q);

      const modules: Module[] = [];
      const sections: Record<string, Section[]> = {};
      const subsections: Record<string, Subsection[]> = {};

      for (const docSnap of snap.docs) {
        if (!docSnap.ref.path.includes(`course/${courseId}/`)) {
          continue;
        }
        const section = fromSectionDoc(docSnap);

        const moduleRef = docSnap.ref.parent.parent;
        if (!moduleRef) continue;
        const moduleSnap = await getDoc(moduleRef);
        if (!moduleSnap.exists()) continue;

        const moduleData = moduleSnap.data();
        const module: Module = {
          id: moduleSnap.id,
          title: moduleData.title,
          number: moduleData.number,
          thumbnailUrl: moduleData.thumbnailUrl,
          description: moduleData.description,
        };

        if (!modules.find((m) => m.id === module.id)) {
          modules.push(module);
        }

        if (!sections[module.id]) {
          sections[module.id] = [];
        }
        sections[module.id].push(section);

        const key = `${module.id}/${section.id}`;
        subsections[key] = await fetchSubsections(module.id, section.id);
      }

      return { modules, sections, subsections };
    } catch (error: any) {
      const code = typeof error?.code === "string" ? error.code : "";
      if (
        code.includes("failed-precondition") ||
        code.includes("permission-denied")
      ) {
        canUseSectionCollectionGroupQuery = false;
      } else {
        console.warn("searchCourseSections: unexpected search error", error);
      }
    }
  }

  const modules = await fetchCourseModules(courseId);
  const matchedModules: Module[] = [];
  const sections: Record<string, Section[]> = {};
  const subsections: Record<string, Subsection[]> = {};

  for (const module of modules) {
    const allSections = await fetchModuleSections({
      courseId,
      moduleId: module.id,
    }).catch(() => []);

    const matchedSections = allSections.filter((section) =>
      section.title.toLowerCase().includes(formatted),
    );

    if (matchedSections.length === 0) {
      continue;
    }

    matchedModules.push(module);
    sections[module.id] = matchedSections;

    for (const section of matchedSections) {
      const key = `${module.id}/${section.id}`;
      subsections[key] = await fetchSubsections(module.id, section.id).catch(
        () => [],
      );
    }
  }
  return { modules: matchedModules, sections, subsections };
}
