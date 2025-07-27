import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHxUWsp29AoFyX_wl-l72iS75zeOgm3Lk",
  authDomain: "maligai-samann.firebaseapp.com",
  projectId: "maligai-samann",
  storageBucket: "maligai-samann.firebasestorage.app",
  messagingSenderId: "491109395264",
  appId: "1:491109395264:web:b5b2184ef3ca47342e28a5",
  measurementId: "G-DYMXFNQGRM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
