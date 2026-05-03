import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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

async function run() {
  try {
    console.log("Testing write...");
    await setDoc(doc(db, 'content', 'test'), { hello: 'world' });
    console.log("Write successful!");
    const snap = await getDoc(doc(db, 'content', 'test'));
    console.log("Read successful! Data:", snap.data());
  } catch(e) {
    console.error("Firebase Error:");
    console.error(e);
  }
  process.exit(0);
}
run();
