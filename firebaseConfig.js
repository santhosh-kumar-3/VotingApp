// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6jsKVsIJIZZXUkEAZ8YhbX51kEJHYdlE",
  authDomain: "e-voting-app-e7767.firebaseapp.com",
  projectId: "e-voting-app-e7767",
  storageBucket: "e-voting-app-e7767.firebasestorage.app",
  messagingSenderId: "901286416211",
  appId: "1:901286416211:web:de95735da6c16969d7dba6",
  measurementId: "G-5R1WNRNP4T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
