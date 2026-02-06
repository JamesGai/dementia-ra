// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export type UserProfile = {
  fullName: string;
  username?: string;
  email: string;
  createdAt?: unknown;
};

/**
 * Sign up:
 * 1) Create Firebase Auth account (email + password)
 * 2) Create Firestore user profile at users/{uid}
 */
export async function signUpWithProfile(params: {
  email: string;
  password: string;
  fullName: string;
  username?: string;
}): Promise<UserCredential> {
  const { email, password, fullName, username } = params;

  // Create Auth user
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // Create Firestore profile (NO password stored here)
  const profile: UserProfile = {
    fullName,
    username,
    email,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, "users", cred.user.uid), profile, { merge: true });

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
export async function fetchMyProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}
