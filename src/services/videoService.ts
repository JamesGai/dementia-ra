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
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase";

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
 * Returns `true` when the supplied asset reference is already a browser-usable URL.
 *
 * @param value Potential asset reference from Firestore.
 * @returns Whether the value is an HTTP(S), blob, or data URL.
 */
function isDirectAssetUrl(value?: string): boolean {
  if (!value) return false;
  return /^(https?:|blob:|data:)/i.test(value);
}

/**
 * Resolves a stored asset reference into a URL usable by the browser video/image tags.
 * Direct URLs are returned unchanged. Firebase Storage paths and `gs://` URIs are
 * converted into signed download URLs via the Firebase SDK.
 *
 * @param value Asset reference stored in Firestore.
 * @returns A playable/downloadable URL, or the original value if resolution fails.
 */
async function resolveStorageAssetUrl(value?: string): Promise<string> {
  if (!value) return "";
  if (isDirectAssetUrl(value)) {
    return value;
  }

  try {
    return await getDownloadURL(ref(storage, value));
  } catch (error) {
    console.warn(`Failed to resolve Firebase Storage URL for "${value}"`, error);
    return value;
  }
}

/**
 * Normalizes a video document by resolving its video and thumbnail references into
 * browser-usable URLs before the UI consumes them.
 *
 * @param video Raw video document merged with its Firestore ID.
 * @returns The video with hydrated `videoUrl` and `thumbnailUrl` fields.
 */
async function hydrateVideoAssets(
  video: Omit<Video, "id"> & { id: string },
): Promise<Video> {
  const [videoUrl, thumbnailUrl] = await Promise.all([
    resolveStorageAssetUrl(video.videoUrl),
    resolveStorageAssetUrl(video.thumbnailUrl),
  ]);

  return {
    ...video,
    videoUrl,
    thumbnailUrl,
  };
}

/**
 * Fetches all videos ordered by creation date descending.
 *
 * @returns The complete video list.
 */
export async function fetchAllVideos(): Promise<Video[]> {
  const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return Promise.all(
    snap.docs.map(async (d) => {
      const data = d.data() as Omit<Video, "id">;
      return hydrateVideoAssets({ id: d.id, ...data });
    }),
  );
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
  return hydrateVideoAssets({ id: snap.id, ...data });
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
  return Promise.all(
    snap.docs.map(async (d) => {
      const data = d.data() as Omit<Video, "id">;
      return hydrateVideoAssets({ id: d.id, ...data });
    }),
  );
}
