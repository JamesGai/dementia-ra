import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export type Video = {
  id: string;
  title: string;
  description: string;
  durationText?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt?: Timestamp;
  numOfViewed?: number;
  module?: string;
};

const VIDEO_INSTRUCTION_ID = "video-instruction";
const COURSE_INSTRUCTION_ID = "course-instruction";
const SERVICE_INSTRUCTION_ID = "service-instruction";

/**
 * Fetches all videos ordered by creation date descending.
 *
 * @returns The complete video list.
 */
export async function fetchAllVideos(): Promise<Video[]> {
  const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Video, "id">;
    return { id: d.id, ...data };
  });
}

/**
 * Fetches a specific instruction video document by its known Firestore ID.
 *
 * @param instructionId Firestore document ID for the instruction video.
 * @returns The instruction video, or `null` when it does not exist.
 */
async function fetchInstructionVideoById(
  instructionId: string,
): Promise<Video | null> {
  const snap = await getDoc(doc(db, "videos", instructionId));
  if (!snap.exists()) {
    return null;
  }

  const data = snap.data() as Omit<Video, "id">;
  return { id: snap.id, ...data };
}

/**
 * Fetches the instruction video for the video library experience.
 *
 * @returns The instruction video, or `null` when it does not exist.
 */
export function fetchVideoInstructionVideo(): Promise<Video | null> {
  return fetchInstructionVideoById(VIDEO_INSTRUCTION_ID);
}

/**
 * Fetches the instruction video for the course experience.
 *
 * @returns The instruction video, or `null` when it does not exist.
 */
export function fetchCourseInstructionVideo(): Promise<Video | null> {
  return fetchInstructionVideoById(COURSE_INSTRUCTION_ID);
}

/**
 * Fetches the instruction video for the service experience.
 *
 * @returns The instruction video, or `null` when it does not exist.
 */
export function fetchServiceInstructionVideo(): Promise<Video | null> {
  return fetchInstructionVideoById(SERVICE_INSTRUCTION_ID);
}

/**
 * Searches videos by a normalized keyword stored in Firestore.
 *
 * @param searchTerm User-entered search term.
 * @returns Videos whose `keywords` array contains the normalized term.
 */
export async function searchVideos(searchTerm: string): Promise<Video[]> {
  if (!searchTerm.trim()) {
    return [];
  }
  const formatted = searchTerm.toLowerCase();
  const q = query(
    collection(db, "videos"),
    where("keywords", "array-contains", formatted),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Video, "id">;
    return { id: d.id, ...data };
  });
}
