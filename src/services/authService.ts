import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// User collection fields (password is stored in Firebase Auth)
export type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  city: string;
  country: string;
  userRole?: string;
  purposeOfUse?: string;
};

/**
 * Sign up:
 * 1) Create Firebase Auth account (email + password)
 * 2) Create Firestore user profile at users/{uid}
 */
export async function signUpWithProfile(params: {
  email: string;
  password: string;
  // Profile object must contain all fields of UserProfile except email. This is because email field is handled by Firebase Auth not Firestore
  profile: Omit<User, "email">;
}) {
  const { email, password, profile } = params;
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    ...profile,
    email,
  });
  return cred;
}

/**
 * Sign in with email + password
 */
export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Send password reset email
 */
export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

/**
 * Sign out
 */
export function signOutUser() {
  return signOut(auth);
}

/**
 * Fetch current user's profile from Firestore
 */
export async function fetchMyProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as User) : null;
}

/**
 * Listen to Firebase Auth state changes
 */
export function subscribeToAuthChanges(
  callback: (user: FirebaseUser | null) => void,
) {
  return onAuthStateChanged(auth, callback);
}

export async function updateMyProfile(uid: string, updates: Partial<User>) {
  // only updates provided fields
  await updateDoc(doc(db, "users", uid), updates);
}
