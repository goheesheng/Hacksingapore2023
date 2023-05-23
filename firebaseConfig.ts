// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTfD0FoBXConqLvsAIt109MQToEFTWicE",
  authDomain: "hacksg2023.firebaseapp.com",
  projectId: "hacksg2023",
  storageBucket: "hacksg2023.appspot.com",
  messagingSenderId: "750713385286",
  appId: "1:750713385286:web:70f4c86ac8460423103547",
  measurementId: "G-V814MTJB0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the storage instance and set the maxUploadRetryTime
const storage = getStorage(app);

export { app, storage };