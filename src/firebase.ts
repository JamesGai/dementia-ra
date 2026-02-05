// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);
