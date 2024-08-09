// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBmAd5NopBZMIntJPcmmhDoKUNuHC3XzsI",
  authDomain: "pantry-tracker-b40b7.firebaseapp.com",
  projectId: "pantry-tracker-b40b7",
  storageBucket: "pantry-tracker-b40b7.appspot.com",
  messagingSenderId: "350643444850",
  appId: "1:350643444850:web:d4152e8165569e65d176eb",
  measurementId: "G-H9YW2KJPMH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };