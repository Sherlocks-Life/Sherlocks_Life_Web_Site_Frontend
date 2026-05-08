import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSy...", // You will need to paste your actual Web API Key here from Firebase Console
  authDomain: "role-based-auth-49fc0.firebaseapp.com",
  projectId: "role-based-auth-49fc0",
  storageBucket: "role-based-auth-49fc0.appspot.com",
  messagingSenderId: "367389274902", // Example sender ID
  appId: "1:367389274902:web:..." 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
