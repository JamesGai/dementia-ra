import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

export type Service = {
  id: string;
  name: string;
  description?: string;
  address: string;
  email: string;
  phone: string;
  link: string;
};

/**
 * Fetches all service records ordered by service name.
 *
 * @returns The complete list of services.
 */
export async function fetchAllServices(): Promise<Service[]> {
  const q = query(collection(db, "services"), orderBy("name", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Service, "id">;
    return {
      id: d.id,
      ...data,
    };
  });
}

/**
 * Searches services by a normalized keyword stored in Firestore.
 *
 * @param searchTerm User-entered search term.
 * @returns Services whose `keywords` array contains the normalized term.
 */
export async function searchServices(searchTerm: string): Promise<Service[]> {
  if (!searchTerm.trim()) {
    return [];
  }
  const formatted = searchTerm.toLowerCase();
  const q = query(
    collection(db, "services"),
    where("keywords", "array-contains", formatted),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Omit<Service, "id">;
    return {
      id: d.id,
      ...data,
    };
  });
}
