import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBs6BPcG82C81MjbPQKXZ0FsXnOCbdIUNQ",
  authDomain: "tapry-cb0cd.firebaseapp.com",
  projectId: "tapry-cb0cd",
  storageBucket: "tapry-cb0cd.firebasestorage.app",
  messagingSenderId: "605460448480",
  appId: "1:605460448480:web:051dcc0f2487d859f3bc85",
  measurementId: "G-4Y75SSG3CN",
};

// Verifica si ya existe una instancia de Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializa Analytics (opcional)
if (getApps().length === 0) {
  getAnalytics(app);
}

export default app;
