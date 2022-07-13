import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAEeTcUrq8kwEBnfPHYU_YbrDv5X7OKaD4",
  // authDomain: "auth-946ad.firebaseapp.com",
  // projectId: "auth-946ad",
  // storageBucket: "auth-946ad.appspot.com",
  // messagingSenderId: "465647540989",
  // appId: "1:465647540989:web:ee670f55237f22dd95bc94",
  apiKey: "AIzaSyAkFVBEHjt7_qpT-iDOgYMmSk3syVeXWhQ",
  authDomain: "auth-40ec8.firebaseapp.com",
  projectId: "auth-40ec8",
  storageBucket: "auth-40ec8.appspot.com",
  messagingSenderId: "403074572294",
  appId: "1:403074572294:web:40bc39d89022704515e387",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
