import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAYYdT1Exy2wvBD1J44ldYviQBerpZh83I",
    authDomain: "apartments-app-f0554.firebaseapp.com",
    projectId: "apartments-app-f0554",
    storageBucket: "apartments-app-f0554.appspot.com",
    messagingSenderId: "1077778331695",
    appId: "1:1077778331695:web:122e0b5ef7a3f70fbbeeda"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();