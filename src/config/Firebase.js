// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAaOcjYbxCEsycrBe08giR1XITNKK4TICo",
  authDomain: "demoproject-ea3c3.firebaseapp.com",
  projectId: "demoproject-ea3c3",
  storageBucket: "demoproject-ea3c3.appspot.com",
  messagingSenderId: "126644714414",
  appId: "1:126644714414:web:8e3aed4e550341ac68663f",
  measurementId: "G-HSR1879CY0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
