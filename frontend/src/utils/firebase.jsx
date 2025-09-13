import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgA34hOtfepKC_mEOssmhMLCCFNcAmnBQ",
  authDomain: "resumeradar-a89a0.firebaseapp.com",
  projectId: "resumeradar-a89a0",
  storageBucket: "resumeradar-a89a0.firebasestorage.app",
  messagingSenderId: "100123178175",
  appId: "1:100123178175:web:44942adbe9e01175b6420a",
  measurementId: "G-V8DGG2TZJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};
export default app;