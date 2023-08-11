// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCCO2GS1MBODuz46lbLCPL4tvzDKR83hQ",
  authDomain: "fir-app-cade1.firebaseapp.com",
  projectId: "fir-app-cade1",
  storageBucket: "fir-app-cade1.appspot.com",
  messagingSenderId: "858370749487",
  appId: "1:858370749487:web:a11e0c41a380886ced82da",
  measurementId: "G-5P8J3NZM84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider =new GoogleAuthProvider(app)
export const db = getFirestore(app)
export const storage = getStorage(app)


