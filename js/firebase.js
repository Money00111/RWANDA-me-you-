// =====================================
// RWANDA Me&You
// Firebase Configuration
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
getStorage
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

const firebaseConfig = {

apiKey: "AIzaSyA9k_ADHHKlF6kJ21_VL91LEVxzXyrhJUs",

authDomain: "rwanda-me-you.firebaseapp.com",

databaseURL: "https://rwanda-me-you-default-rtdb.firebaseio.com",

projectId: "rwanda-me-you",

storageBucket: "rwanda-me-you.firebasestorage.app",

messagingSenderId: "1045065051966",

appId: "1:1045065051966:web:343afa4e425bda7efac66f"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
