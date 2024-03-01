// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log(process.env.REACT_APP_FIREBASE_ID);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_ID,
  authDomain: "silken-champion-415821.firebaseapp.com",
  projectId: "silken-champion-415821",
  storageBucket: "silken-champion-415821.appspot.com",
  messagingSenderId: "471291649994",
  appId: "1:471291649994:web:92903d5eba9b411fd8b933",
  measurementId: "G-C4S8DB5HY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);