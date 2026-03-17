// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  initializeAuth,
  inMemoryPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Capacitor } from "@capacitor/core";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmH7Rr_xb5SoRAYjCGCmppxrrW0kT99lI",
  authDomain: "dementia-ra.firebaseapp.com",
  projectId: "dementia-ra",
  storageBucket: "dementia-ra.firebasestorage.app",
  messagingSenderId: "861727365519",
  appId: "1:861727365519:web:6f50925ac367875ef253fa",
  measurementId: "G-0QYJ9JQMXN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const isNative = Capacitor.isNativePlatform();
// getAuth() tells Firebase to use its default browser-style Auth setup instead of runtime Webview provided by Capacitor. So we need to change getAuth() to initializeAuth()
export const auth = initializeAuth(app, {
  persistence: isNative ? inMemoryPersistence : browserLocalPersistence,
});
export const db = getFirestore(app);
export const storage = getStorage(app);
console.log("Firebase initialized");
console.log("Native platform:", isNative);
console.log(
  "Auth persistence:",
  isNative ? "inMemoryPersistence" : "browserLocalPersistence",
);
