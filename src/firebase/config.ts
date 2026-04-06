import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "desa-lengkap-15157263-d704f",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:464864018017:web:e5a623572ff6a038ea7420",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDddQU72zuGblsonoT_OSk8wPcDvHxTcK4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "desa-lengkap-15157263-d704f.firebaseapp.com",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "464864018017",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "desa-lengkap-15157263-d704f.appspot.com",
};

let app: FirebaseApp;
if (!getApps().length) {
    try {
      // Attempt to initialize via Firebase App Hosting environment variables
      app = initializeApp();
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      app = initializeApp(firebaseConfig);
    }
} else {
    app = getApp();
}

export const db = getFirestore(app);
export const storage = getStorage(app);
