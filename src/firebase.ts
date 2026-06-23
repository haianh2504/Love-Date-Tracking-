// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = import.meta.env;
const requiredFirebaseEnv = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
] as const;

const missingFirebaseEnv = requiredFirebaseEnv.filter((key) => !env[key]);

if (missingFirebaseEnv.length > 0) {
  throw new Error(
    `Missing required Firebase env vars: ${missingFirebaseEnv.join(", ")}`
  );
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Only initialize Analytics in a browser-like environment.
// This avoids errors in SSR or build-time tooling that may not have `window`.
export const analytics =
  typeof window !== "undefined" && typeof navigator !== "undefined"
    ? getAnalytics(app)
    : undefined;

// Lazily initialize Firebase Authentication only in browser runtime
export const getFirebaseAuth = () => {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be initialized in the browser.");
  }
  return getAuth(app);
};

export const googleProvider = new GoogleAuthProvider();