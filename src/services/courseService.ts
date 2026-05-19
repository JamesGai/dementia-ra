import {
  arrayUnion,
  collection,
  collectionGroup,
  FieldPath,
  getDoc,
  getDocs,
  orderBy,
  query,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
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

export type ContentBlock =
  | {
      type: "heading" | "subheading" | "paragraph";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "table";
      headers: string[];
      rows: {
        left: string;
        right: string[];
      }[];
    }
  | {
      type: "activity";
      inputType: "textarea";
      prompt: string;
    };

export type Subsection = {
  id: string;
  moduleNumber: number;
  sectionNumber: number;
  subsectionNumber?: number;
  displayOrder: number;
  isCourseSubsection?: boolean;
  title: string;
  content?: ContentBlock[];
};

export type ActivityAnswer = {
  answer: string;
};

export async function fetchActivityAnswer(params: {
  uid: string;
  subsectionId: string;
}): Promise<ActivityAnswer | null> {
  const { uid, subsectionId } = params;
  const snap = await getDoc(doc(db, "users", uid));

  if (!snap.exists()) {
    return null;
  }

  const data = snap.data() as {
    activityAnswers?: Record<string, { answer?: unknown }>;
  };
  const activityAnswer = data.activityAnswers?.[subsectionId];

  if (!activityAnswer || typeof activityAnswer.answer !== "string") {
    return null;
  }

  return {
    answer: activityAnswer.answer,
  };
}

export async function saveActivityAnswer(params: {
  uid: string;
  subsection: Subsection;
  inputType: "textarea";
  answer: string;
}): Promise<void> {
  const { uid, subsection, inputType, answer } = params;

  await updateDoc(
    doc(db, "users", uid),
    new FieldPath("activityAnswers", subsection.id),
    {
      answer,
      inputType,
      moduleNumber: subsection.moduleNumber,
      sectionNumber: subsection.sectionNumber,
      subsectionNumber: subsection.subsectionNumber ?? null,
      updatedAt: serverTimestamp(),
    },
  );
}

const DEFAULT_PROGRESS_MODULE_COUNT = 5;
let canUseSectionCollectionGroupQuery = true;

function sortSubsections(subsections: Subsection[]) {
  return [...subsections].sort((a, b) => {
    return a.displayOrder - b.displayOrder;
  });
}

/**
 * Builds a subsection progress token in the format `module.section.subsection`.
 * Example: `1.1.0`.
 *
 * @param params Subsection location identifiers.
 * @returns A stable progress key used in `users/{uid}.courseProgress`.
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
 *
 * @param params User ID and subsection location identifiers.
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
 *
 * @param params User lookup parameters.
 * @returns A set of completed subsection progress keys.
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
 *
 * @param params Course ID, user ID, and optional module count to include.
 * @returns Per-module completion percentages ordered by module number.
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
        if (
          sub.isCourseSubsection === false ||
          sub.subsectionNumber === undefined
        ) {
          continue;
        }

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

/**
 * Fetches all course documents from Firestore.
 *
 * @returns A list of available courses.
 */
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

/**
 * Fetches all modules for a course ordered by module number.
 *
 * @param courseId Firestore course document ID.
 * @returns Ordered course modules.
 */
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

/**
 * Fetches the sections for a module ordered by section number.
 *
 * @param params Course and module identifiers.
 * @returns Ordered sections within the module.
 */
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

/**
 * Fetches the subsections for a section ordered by subsection number.
 *
 * @param params Course, module, and section identifiers.
 * @returns Ordered subsections within the section.
 */
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
  const snap = await getDocs(col);
  const subsections = snap.docs.map((d) => {
    const data = d.data() as Omit<Subsection, "id">;
    return {
      id: d.id,
      ...data,
      moduleNumber: data.moduleNumber,
      sectionNumber: data.sectionNumber,
      subsectionNumber: data.subsectionNumber,
      displayOrder: data.displayOrder,
      isCourseSubsection: data.isCourseSubsection,
    };
  });

  return sortSubsections(subsections);
}

/**
 * Fetches the full course tree and groups sections and subsections by parent IDs.
 *
 * @param courseId Firestore course document ID.
 * @returns Modules plus lookup tables for their sections and subsections.
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

/**
 * Fetches a single subsection document by its full path.
 *
 * @param params Course, module, section, and subsection identifiers.
 * @returns The subsection detail, or `null` when the document does not exist.
 */
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
    displayOrder: data.displayOrder,
    isCourseSubsection: data.isCourseSubsection,
    title: data.title,
    content: Array.isArray(data.content) ? data.content : [],
  };
}

/**
 * Searches course sections by keyword and returns the matching course tree subset.
 * Uses a collection group query when available and falls back to per-module filtering.
 *
 * @param courseId Firestore course document ID.
 * @param searchTerm User-entered search term.
 * @returns Matching modules plus lookup tables for their sections and subsections.
 */
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
    const subsectionSnap = await getDocs(subsectionCol);
    const subsections = subsectionSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title,
        moduleNumber: data.moduleNumber,
        sectionNumber: data.sectionNumber,
        subsectionNumber: data.subsectionNumber,
        displayOrder: data.displayOrder,
        isCourseSubsection: data.isCourseSubsection,
      } as Subsection;
    });

    return sortSubsections(subsections);
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
