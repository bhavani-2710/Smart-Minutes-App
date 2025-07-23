// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkukZhiwV9UX_a0EAHOcUY8M8O_bb322Y",
  authDomain: "smart-minutes-58648.firebaseapp.com",
  projectId: "smart-minutes-58648",
  storageBucket: "smart-minutes-58648.firebasestorage.app",
  messagingSenderId: "449959977950",
  appId: "1:449959977950:web:e378de03d15f644217b34f",
  measurementId: "G-97EZ592N1T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth, db };

