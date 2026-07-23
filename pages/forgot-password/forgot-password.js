// ======================================
// RWANDA Me&You
// Forgot Password Logic
// ======================================


import {

resetPassword

}

from "../../services/authService.js";




const form =
document.getElementById("resetForm");



form.addEventListener(
"submit",

async(e)=>{


e.preventDefault();



const email =

document.getElementById("email")
.value
.trim();




try{


await resetPassword(email);



alert(
"Password reset link sent. Check your email."
);



window.location.href =
"../login/login.html";



}

catch(error){


console.error(error);



if(error.code==="auth/user-not-found"){

alert(
"No account found with this email."
);

}

else{

alert(error.message);

}



}



});
