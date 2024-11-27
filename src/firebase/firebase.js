// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs6BPcG82C81MjbPQKXZ0FsXnOCbdIUNQ",
  authDomain: "tapry-cb0cd.firebaseapp.com",
  projectId: "tapry-cb0cd",
  storageBucket: "tapry-cb0cd.appspot.com",
  messagingSenderId: "605460448480",
  appId: "1:605460448480:web:051dcc0f2487d859f3bc85",
  measurementId: "G-4Y75SSG3CN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
