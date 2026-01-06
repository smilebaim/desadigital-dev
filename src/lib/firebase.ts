// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTTVBuxYZxQNLWP3g8ffb0T5wYuVik6yo",
  authDomain: "digitaldesa-dev.firebaseapp.com",
  projectId: "digitaldesa-dev",
  storageBucket: "digitaldesa-dev.appspot.com",
  messagingSenderId: "767082912199",
  appId: "1:767082912199:web:dee4c91c346ca2283da1e2",
  measurementId: "G-MBPTG50C7K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const db = getFirestore(app);

export { app, auth, analytics, db };
