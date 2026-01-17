"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* 🔐 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyDQE9ZF5TmWEmAs9RVHxF1Vpjjt3UxsbVk",
  authDomain: "ecoguide-90bf6.firebaseapp.com",
  projectId: "ecoguide-90bf6",
  storageBucket: "ecoguide-90bf6.appspot.com",
  messagingSenderId: "558437393921",
  appId: "1:558437393921:web:945f39b5672f9c4c06c200",
};

/* ✅ Prevent double initialization */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/* ✅ Export services */
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
