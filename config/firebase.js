// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ4xjwxo6AsdgdnFvkpTPj5sWMIdtqHh8",
  authDomain: "towx-b0b44.firebaseapp.com",
  projectId: "towx-b0b44",
  storageBucket: "towx-b0b44.firebasestorage.app",
  messagingSenderId: "263540352695",
  appId: "1:263540352695:web:9bb4467cc4dc521a584f32",
  measurementId: "G-CTH27QWM0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);