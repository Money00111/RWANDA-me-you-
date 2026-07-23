// ======================================
// RWANDA Me&You
// Authentication Service
// ======================================


import {auth, db}
from "./firebase.js";



import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

signOut,

sendPasswordResetEmail

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";



import {

doc,

setDoc

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";




// ===============================
// REGISTER USER
// ===============================

export async function registerUser(
name,
email,
password
){


const result =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user = result.user;



await setDoc(

doc(db,"users",user.uid),

{


uid:user.uid,

name:name,

email:email,

photo:"",

bio:"",

createdAt:new Date()


}

);



return user;


}






// ===============================
// LOGIN USER
// ===============================


export async function loginUser(
email,
password
){


const result =

await signInWithEmailAndPassword(

auth,

email,

password

);



return result.user;


}





// ===============================
// LOGOUT
// ===============================


export async function logoutUser(){


await signOut(auth);


}





// ===============================
// RESET PASSWORD
// ===============================


export async function resetUserPassword(email){


await sendPasswordResetEmail(

auth,

email

);


}

// ===============================
// RESET PASSWORD
// ===============================

import {

sendPasswordResetEmail

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";



export async function resetPassword(email){


await sendPasswordResetEmail(

auth,

email

);


}
