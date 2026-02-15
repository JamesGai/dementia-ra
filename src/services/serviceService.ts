import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
