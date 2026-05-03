import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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

const run = async () => {
    try {
        const docRef = doc(db, 'content', 'main');
        await setDoc(docRef, {
          siteConfig: {
            name: { en: 'Hamed Walid', ar: 'حامد وليد' },
            role: { en: 'UX Designer', ar: 'مصمم تجربة مستخدم' },
            summary: { en: '', ar: '' },
            detailed_summary: { en: '', ar: '' },
            siteImages: { aboutPortrait: '' }
          },
          projects: [],
          timeline: [],
          competencies: [],
          settings: { showCursor: true, theme: 'dark' }
        }, { merge: false });
        console.log("✅ Data successfully cleared from Firebase.");
        process.exit(0);
    } catch (e) {
        console.error("❌ Error:", e);
        process.exit(1);
    }
};

run();
