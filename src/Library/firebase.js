// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAKhyKzWzp1xsgY_10_h1F-UKyiufQywJY",
//   authDomain: "learapp-9389e.firebaseapp.com",
//   projectId: "learapp-9389e",
// //   storageBucket: "learapp-9389e.firebasestorage.app",
// storageBucket: "learapp-9389e.appspot.com",

//   messagingSenderId: "795800070084",
//   appId: "1:795800070084:web:6c527976e855d0800a2691"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth()
// export const db = getFirestore()



import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

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

