// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlfqbldaSd9BMfIVEYdu0PGVIzjPjQzIM",
  authDomain: "astro-authentication-7f81a.firebaseapp.com",
  projectId: "astro-authentication-7f81a",
  storageBucket: "astro-authentication-7f81a.appspot.com",
  messagingSenderId: "276033507017",
  appId: "1:276033507017:web:47e3928e49f5d922c10718",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth,
};
