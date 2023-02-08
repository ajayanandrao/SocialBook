// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPNCxFTf6ew83aKV_PawA_1_7eIQ7VOpA",
  authDomain: "fir-25-12-2022.firebaseapp.com",
  projectId: "fir-25-12-2022",
  storageBucket: "fir-25-12-2022.appspot.com",
  messagingSenderId: "771222562534",
  appId: "1:771222562534:web:bc7f1087d83a7e567c3d27"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const storage = getStorage(app);

const db = getFirestore(app);

export {auth, db, storage};