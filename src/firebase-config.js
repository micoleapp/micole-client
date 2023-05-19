import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANvwfALTzR3UcW0EnSJKdixKmG2Dj6QUU",
  authDomain: "micole-53f0b.firebaseapp.com",
  projectId: "micole-53f0b",
  storageBucket: "micole-53f0b.appspot.com",
  messagingSenderId: "638799237041",
  appId: "1:638799237041:web:d767111a00c581d193b790",
  measurementId: "G-3Q5KTK171J",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let providerFacebook = new  FacebookAuthProvider();

const providerGoogle = new GoogleAuthProvider();

export { auth, providerFacebook, providerGoogle };
