// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr874LGIQyP-x3ALyX5VOEVt9jGq4hK4M",
  authDomain: "uber-next-clone-live-81011.firebaseapp.com",
  projectId: "uber-next-clone-live-81011",
  storageBucket: "uber-next-clone-live-81011.appspot.com",
  messagingSenderId: "762767968432",
  appId: "1:762767968432:web:00014e076ea9b30a6d9375",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth }