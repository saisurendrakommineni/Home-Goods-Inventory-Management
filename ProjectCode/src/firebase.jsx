import React from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import the Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDUfmBPE8zyNpu_CvRNcNuqK-9NJFAHQqg",
  authDomain: "home-goods-inventory-system.firebaseapp.com",
  projectId: "home-goods-inventory-system",
  storageBucket: "home-goods-inventory-system.appspot.com",
  messagingSenderId: "832889371836",
  appId: "1:832889371836:web:0835ab013150bc05d964b9",
  measurementId: "G-1HL856XXMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
const auth = getAuth(app); 
const database = getDatabase(app); 
export { auth,database }; 