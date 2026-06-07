import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUIpBtWDuKbkIGkjIOP4F3wKVAmhWT3dc",
  authDomain: "hamed-web.firebaseapp.com",
  projectId: "hamed-web",
  storageBucket: "hamed-web.firebasestorage.app",
  messagingSenderId: "927863215454",
  appId: "1:927863215454:web:9b9438384ef20574b4ebcf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function searchEverything() {
  const collections = ['content', 'site', 'config', 'settings', 'data', 'portfolio'];
  for (const colName of collections) {
    try {
      const q = await getDocs(collection(db, colName));
      if (!q.empty) {
        console.log(`--- Collection: ${colName} ---`);
        q.forEach(doc => {
          console.log(`ID: ${doc.id}`);
          // console.log(JSON.stringify(doc.data(), null, 2));
          // Just print the heroHeadline to verify
          const data = doc.data();
          if (data.siteConfig && data.siteConfig.heroHeadline) {
             console.log(`Hero Headline: ${JSON.stringify(data.siteConfig.heroHeadline)}`);
          } else if (data.heroHeadline) {
             console.log(`Hero Headline (root): ${JSON.stringify(data.heroHeadline)}`);
          }
        });
      }
    } catch (e) {}
  }
}

searchEverything();
