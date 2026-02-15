import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export type Video = {
  id: string;
  title: string;
  description: string;
  durationText: string;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt?: Timestamp;
  numOfViewed?: number;
  module?: string;
};

export async function fetchAllVideos(): Promise<Video[]> {
  const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Video, "id">;
    return { id: d.id, ...data };
  });
}
