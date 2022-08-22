import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, setDoc, query, where
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
  await setDoc(doc(usersCollectionRef, String(user)), data, { merge: true });
  console.log("created")
  return "created"
};

export const getUser = async (address) => {
  const usersCollectionRef = collection(db, "applywhite");
  const q = query(usersCollectionRef, where("address", "==", address));
  const querySnapshota = await getDocs(q);
  let data
  querySnapshota.forEach((doc) => {
    data = doc.data()
    data.date = new Date((data.date.seconds)*1000)
  });
  console.log("whit", data)
  return data
}
