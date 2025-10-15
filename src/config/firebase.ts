import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// HARD-CODED CONFIG (temporaneo per debugging)
const firebaseConfig = {
  apiKey: "AIzaSyAVL3XMsbiB_axDkvgMJLnFRXm-yhPl4rk",
  authDomain: "opera-manufacture.firebaseapp.com",
  projectId: "opera-manufacture",
  storageBucket: "opera-manufacture.firebasestorage.app",
  messagingSenderId: "309965036329",
  appId: "1:309965036329:web:5d68ce646e1db70bcb2f538",
  measurementId: "G-TEY61RBYB"
};

// Log per debug
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? '✅ Present' : '❌ Missing',
  authDomain: firebaseConfig.authDomain ? '✅ Present' : '❌ Missing',
  projectId: firebaseConfig.projectId ? '✅ Present' : '❌ Missing'
});

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
export default app;
