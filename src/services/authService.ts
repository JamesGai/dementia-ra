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
  avatarUrl?: string;
  courseProgress?: string[];
};

/**
 * Sign up:
 * 1) Create Firebase Auth account (email + password)
 * 2) Create Firestore user profile at users/{uid}
 *
 * @param params Signup credentials and the Firestore profile payload.
 * @returns The Firebase authentication credential for the new user.
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
 * Signs a user in with an email address and password.
 *
 * @param email User email address.
 * @param password User password.
 * @returns The Firebase authentication result for the signed-in user.
 */
export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sends a password reset email to the provided address.
 *
 * @param email Account email address.
 * @returns A promise that resolves when Firebase accepts the reset request.
 */
export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

/**
 * Signs the current user out of Firebase Auth.
 *
 * @returns A promise that resolves when sign-out completes.
 */
export function signOutUser() {
  return signOut(auth);
}

/**
 * Fetches a user's profile document from Firestore.
 *
 * @param uid Firebase Auth user ID.
 * @returns The stored user profile, or `null` when no document exists.
 */
export async function fetchMyProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as User) : null;
}

/**
 * Subscribes to Firebase Auth state changes.
 *
 * @param callback Listener invoked whenever the authenticated user changes.
 * @returns The unsubscribe function returned by Firebase Auth.
 */
export function subscribeToAuthChanges(
  callback: (user: FirebaseUser | null) => void,
) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Updates selected fields on a user's Firestore profile document.
 *
 * @param uid Firebase Auth user ID.
 * @param updates Partial profile fields to update.
 */
export async function updateMyProfile(uid: string, updates: Partial<User>) {
  // only updates provided fields
  await updateDoc(doc(db, "users", uid), updates);
}
