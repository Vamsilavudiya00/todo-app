// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClSo_TOXqQoXM0sLG6z7oejGkzl881bQU",
  authDomain: "todo-app-a340b.firebaseapp.com",
  projectId: "todo-app-a340b",
  storageBucket: "todo-app-a340b.appspot.com",
  messagingSenderId: "22579179159",
  appId: "1:22579179159:web:f21f926de5ec0e984b03d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
