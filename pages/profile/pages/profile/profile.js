// ======================================
// RWANDA Me&You
// Profile Setup Logic
// ======================================


import {auth, db}
from "../../services/firebase.js";


import {

doc,
updateDoc

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";



import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";



const form =
document.getElementById("profileForm");


let currentUser = null;



onAuthStateChanged(auth,(user)=>{


if(!user){


window.location.href="../login/login.html";

return;


}


currentUser=user;


});






form.addEventListener(
"submit",

async(e)=>{


e.preventDefault();



if(!currentUser){

alert("User not found");

return;

}




const profileData={


age:
document.getElementById("age").value,


gender:
document.getElementById("gender").value,


country:
document.getElementById("country").value,


city:
document.getElementById("city").value,


bio:
document.getElementById("bio").value,


interests:
document.getElementById("interests").value,


profileCompleted:true,


updatedAt:new Date()


};





try{


const userRef =
doc(
db,
"users",
currentUser.uid
);



await updateDoc(

userRef,

profileData

);



alert("Profile completed");



window.location.href=
"../home/home.html";



}

catch(error){


console.error(error);


alert(error.message);


}



});
