// ======================================
// RWANDA Me&You
// Authentication Guard
// ======================================


import {auth, db}
from "./firebase.js";


import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";



import {

doc,
getDoc

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";





export function checkUserStatus(){


onAuthStateChanged(

auth,

async(user)=>{



if(!user){


window.location.href =
"../login/login.html";


return;


}




const userRef =

doc(

db,

"users",

user.uid

);



const snapshot =

await getDoc(userRef);





if(!snapshot.exists()){


window.location.href =
"../profile/profile.html";


return;


}





const data = snapshot.data();




if(data.profileCompleted){


window.location.href =
"../home/home.html";


}

else{


window.location.href =
"../profile/profile.html";


}



});


}
