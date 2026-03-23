// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_AUTH_DOMAIN,
  projectId: "financly-3b6ff",
  storageBucket: "financly-3b6ff.firebasestorage.app",
  messagingSenderId: "979289214875",
  appId: "1:979289214875:web:a1cc3bc76d78ddf8099b3e",
  measurementId: "G-WGP0R1DL8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {db,auth,provider,doc,setDoc};