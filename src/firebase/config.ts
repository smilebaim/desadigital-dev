import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  "projectId": "desa-lengkap-15157263-d704f",
  "appId": "1:464864018017:web:e5a623572ff6a038ea7420",
  "apiKey": "AIzaSyDddQU72zuGblsonoT_OSk8wPcDvHxTcK4",
  "authDomain": "desa-lengkap-15157263-d704f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "464864018017"
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
