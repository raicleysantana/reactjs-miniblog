import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgp58lZDJi2E7eNJ0lBMxuInoaCY10aBQ",
    authDomain: "miniblog-46ac8.firebaseapp.com",
    projectId: "miniblog-46ac8",
    storageBucket: "miniblog-46ac8.appspot.com",
    messagingSenderId: "207290566813",
    appId: "1:207290566813:web:0bed75772ef0cfdfa7ac74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };