// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
export { app as firebaseApp, firebaseConfig };
