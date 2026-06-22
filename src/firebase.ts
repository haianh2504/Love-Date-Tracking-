// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDweO5_jPh7ainTlYCMahfMVunmDxGtz20",
  authDomain: "love-date-29288.firebaseapp.com",
  projectId: "love-date-29288",
  storageBucket: "love-date-29288.firebasestorage.app",
  messagingSenderId: "1063802009471",
  appId: "1:1063802009471:web:475b83f568233af755cc4a",
  measurementId: "G-4RZMSM5HT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);