// ======================================
// RWANDA Me&You
// Login Logic
// ======================================


import {

loginUser

}

from "../../services/authService.js";




const form =

document.getElementById("loginForm");



const button =

document.getElementById("loginBtn");






// Show password

document
.getElementById("showPassword")
.onclick=()=>{


const password =

document.getElementById("password");



if(password.type==="password"){


password.type="text";


}

else{


password.type="password";


}


};







// Login


form.addEventListener(
"submit",

async(e)=>{


e.preventDefault();



const email =

document.getElementById("email").value.trim();



const password =

document.getElementById("password").value;




try{


button.disabled=true;

button.innerText="Loading...";




await loginUser(

email,

password

);




window.location.href =

"../home/home.html";





}

catch(error){


console.error(error);


alert(error.message);



button.disabled=false;

button.innerText="Login";


}



});
