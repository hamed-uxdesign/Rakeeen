import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

getDoc(doc(db, "content", "main"))
  .then(snap => {
    if(snap.exists()) {
      console.log("DB DATA EXISTS!");
      console.log("Name in DB:", snap.data().siteConfig?.name);
    } else {
      console.log("DB DATA DOES NOT EXIST.");
    }
    process.exit(0);
  })
  .catch(e => {
    console.error("FIREBASE ERROR:", e.message);
    process.exit(1);
  });
