// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyA9k_ADHHKlF6kJ21_VL91LEVxzXyrhJUs",
authDomain: "rwanda-me-you.firebaseapp.com",
projectId: "rwanda-me-you",
storageBucket: "rwanda-me-you.appspot.com",
messagingSenderId: "1045065051966",
appId: "1:1045065051966:web:343afa4e425bda7efac66f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
