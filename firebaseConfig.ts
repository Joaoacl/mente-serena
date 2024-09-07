// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage"
import {getFirestore, collection} from 'firebase/firestore'
//import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlZTnoBhNT0PPMBvBECX5oat9dqwYuF3I",
  authDomain: "menteserena-36cf8.firebaseapp.com",
  projectId: "menteserena-36cf8",
  storageBucket: "menteserena-36cf8.appspot.com",
  messagingSenderId: "290073062019",
  appId: "1:290073062019:web:c8c713775a7429d565c9b6",
  measurementId: "G-Z23BMV58NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)
//export const storage = getStorage(app);

export const usersRef = collection(db, 'users')
export const roomRef = collection(db, 'rooms')
