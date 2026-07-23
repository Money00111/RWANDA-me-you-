// ======================================
// RWANDA Me&You
// Auto Login
// ======================================


import {auth}
from "../../services/firebase.js";



import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";





onAuthStateChanged(
auth,

(user)=>{


if(user){


window.location.href =
"../home/home.html";


}

else{


window.location.href =
"../login/login.html";


}


});
