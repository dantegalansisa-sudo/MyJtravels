import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBUqzCWOeoqAyy1jyDKt0Q3iTod7fhP6Vs",
  authDomain: "myjtravel.firebaseapp.com",
  projectId: "myjtravel",
  storageBucket: "myjtravel.firebasestorage.app",
  messagingSenderId: "1099043851049",
  appId: "1:1099043851049:web:a4452ee77d8d25c8990538",
  measurementId: "G-R7FPX78C6H",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
