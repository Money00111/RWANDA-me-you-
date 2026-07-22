// ======================================
// RWANDA Me&You
// Register System
// ======================================


import {auth, db} from "../services/firebase.js";


import {

createUserWithEmailAndPassword,
updateProfile

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


import {

doc,
setDoc

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";





const form =
document.getElementById("registerForm");





form.addEventListener("submit", async(e)=>{


e.preventDefault();



const name =
document.getElementById("name").value.trim();


const email =
document.getElementById("email").value.trim();


const password =
document.getElementById("password").value;


const confirm =
document.getElementById("confirmPassword").value;




if(password !== confirm){

alert("Passwords do not match");

return;

}



try{


// CREATE ACCOUNT

const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user =
userCredential.user;



// SAVE NAME

await updateProfile(user,{

displayName:name

});




// SAVE USER DATA FIRESTORE

await setDoc(

doc(db,"users",user.uid),

{

uid:user.uid,

name:name,

email:email,

createdAt:new Date()

}

);




alert("Account created successfully");


// NEXT PAGE

window.location.href="../profile-setup.html";



}catch(error){


alert(error.message);


}



});
