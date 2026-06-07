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

async function listDocs() {
  try {
    const querySnapshot = await getDocs(collection(db, 'content'));
    querySnapshot.forEach((doc) => {
      console.log(`Document ID: ${doc.id}`);
      console.log(JSON.stringify(doc.data(), null, 2));
      console.log('---');
    });
  } catch (error) {
    console.error("Error listing documents:", error);
  }
}

listDocs();
