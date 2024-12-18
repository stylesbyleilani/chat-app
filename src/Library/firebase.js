


import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  // apiKey:"AIzaSyBZQUZL-hPyFHsth60Y0x2DgkIUcXEdoAM",
  authDomain: "leilani-chatapp.firebaseapp.com",
  projectId: "leilani-chatapp",
  storageBucket: "leilani-chatapp.appspot.com",
  messagingSenderId: "436759409571",
  appId: "1:436759409571:web:7065088d1b86b49aeaa016",
  measurementId: "G-2RP1Z708TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

