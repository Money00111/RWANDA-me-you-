// ======================================
// RWANDA Me&You
// Register Logic
// ======================================


import {

registerUser

}

from "../../services/authService.js";



const form =
document.getElementById("registerForm");



const button =
document.getElementById("registerBtn");





// SHOW PASSWORD

document
.querySelectorAll(".show-password")
.forEach(btn=>{


btn.addEventListener("click",()=>{


const id =
btn.dataset.id;


const input =
document.getElementById(id);



if(input.type==="password"){


input.type="text";


btn.innerHTML =
`<i class="fa-solid fa-eye-slash"></i>`;


}

else{


input.type="password";


btn.innerHTML =
`<i class="fa-solid fa-eye"></i>`;


}



});


});





// REGISTER


form.addEventListener(
"submit",

async(e)=>{


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


button.disabled=true;

button.innerText="Creating...";




await registerUser(

name,

email,

password

);




alert("Account created successfully");



// next page

window.location.href =
"../profile/profile.html";





}

catch(error){


console.error(error);


alert(error.message);



button.disabled=false;

button.innerText="Create Account";



}



});
