// ======================================
// RWANDA Me&You
// Firebase Configuration
// ======================================


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";


import { getAuth } 
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


import { getFirestore } 
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


import { getStorage } 
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";




// Firebase Config

const firebaseConfig = {

apiKey:
"AIzaSyC2Ov1i3RKve-RxJ5vXN8KssPqau7PX3BA",


authDomain:
"rwanda-me-you-55cdf.firebaseapp.com",


projectId:
"rwanda-me-you-55cdf",


storageBucket:
"rwanda-me-you-55cdf.firebasestorage.app",


messagingSenderId:
"859478943706",


appId:
"1:859478943706:web:0dedafe6c7bd142a0802e3",


measurementId:
"G-8J4XZ9HZW6"

};





// Initialize Firebase

const app = initializeApp(firebaseConfig);




// Services

export const auth = getAuth(app);


export const db = getFirestore(app);


export const storage = getStorage(app);



export default app;
