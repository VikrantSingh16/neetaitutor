require('dotenv').config()
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: 'AIzaSyDMi_pc2x_oOhPf0ZADbBNUFWuQsTvmqJ4',
  authDomain: "neet-tutor.firebaseapp.com",
  projectId: "neet-tutor",
  storageBucket: "neet-tutor.appspot.com",
  messagingSenderId: "696337746846",
  appId: "1:696337746846:web:a0bffdd34cb8c344c6e48f",
  measurementId: "G-BYCQQCQLH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
export {auth,db}