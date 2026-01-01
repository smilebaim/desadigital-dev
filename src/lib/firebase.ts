
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-uCgjFbSZE7kkoClQYjo63dalLQlS0_o",
  authDomain: "remaubakotuo-devnew.firebaseapp.com",
  projectId: "remaubakotuo-devnew",
  storageBucket: "remaubakotuo-devnew.firebasestorage.app",
  messagingSenderId: "529395813880",
  appId: "1:529395813880:web:af6aec7927b90a0f029a0d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
