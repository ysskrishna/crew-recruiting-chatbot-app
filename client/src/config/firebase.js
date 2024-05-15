// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvcy3dIxH0Q8_3zcmPAcyy7FtwN8rXVHQ",
  authDomain: "indie-gpt.firebaseapp.com",
  projectId: "indie-gpt",
  storageBucket: "indie-gpt.appspot.com",
  messagingSenderId: "471483266080",
  appId: "1:471483266080:web:d89080f40d7abb9a243845",
  measurementId: "G-V6SDHPKZWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {auth, googleProvider, githubProvider};
