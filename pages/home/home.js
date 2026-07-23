// ======================================
// RWANDA Me&You
// Home Logic
// ======================================


import {auth}
from "../../services/firebase.js";


import {

signOut

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";





// Navigation buttons

document
.querySelectorAll("[data-page]")
.forEach(button=>{


button.addEventListener("click",()=>{


window.location.href =
button.dataset.page;


});


});






// Logout


const logoutBtn =
document.getElementById("logoutBtn");



logoutBtn.addEventListener(
"click",

async()=>{


try{


await signOut(auth);



window.location.href =
"../../index.html";



}

catch(error){


console.error(error);


alert(error.message);


}


});
