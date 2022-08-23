import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, setDoc, query, where, push
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aptothemoon-ed4af.firebaseapp.com",
  projectId: "aptothemoon-ed4af",
  storageBucket: "aptothemoon-ed4af.appspot.com",
  messagingSenderId: "1081744175242",
  appId: "1:1081744175242:web:dc67eea5ee983ebac87d73",
  measurementId: "G-CVJEXR6871"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUser = async (user, data) => {
  const usersCollectionRef = collection(db, "contacts");
  await setDoc(doc(usersCollectionRef), data);
  console.log("created")
  return "created"
};

export const getUser = async (address) => {
  const usersCollectionRef = collection(db, "contacts");
  const q = query(usersCollectionRef, where("account", "==", address));
  const querySnapshota = await getDocs(q);
  let data =[]
  querySnapshota.forEach((doc) => {
    data.push( doc.data())
  });
  return data
}
