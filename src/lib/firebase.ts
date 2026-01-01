// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdFIjD90JKyceKxo8TlHINqo8dViQXLXE",
  authDomain: "studio-4984096933-de14f.firebaseapp.com",
  projectId: "studio-4984096933-de14f",
  storageBucket: "studio-4984096933-de14f.firebasestorage.app",
  messagingSenderId: "384638482841",
  appId: "1:384638482841:web:547fff054fce96516dfb08"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
