// ======================================
// RWANDA Me&You
// auth.js - PART 1
// ======================================

import { auth } from "./firebase.js";

import {
RecaptchaVerifier,
signInWithPhoneNumber

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// ================================
// ELEMENTS
// ================================

const form = document.getElementById("loginForm");
const phoneInput = document.getElementById("phone");
const sendBtn = document.getElementById("sendCode");
const guestBtn = document.getElementById("guestBtn");

let loading = false;


// ================================
// PHONE INPUT
// ================================

const iti = window.intlTelInput(phoneInput,{

initialCountry:"rw",

preferredCountries:[
"rw",
"ke",
"ug",
"tz",
"bi",
"cd",
"ng",
"za",
"us",
"gb"
],

separateDialCode:true,

autoPlaceholder:"aggressive",

utilsScript:
"https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"

});


// ================================
// RECAPTCHA
// ================================

let recaptchaVerifier;

function initRecaptcha(){

if(recaptchaVerifier){

return recaptchaVerifier;

}

recaptchaVerifier = new RecaptchaVerifier(

auth,

"recaptcha-container",

{

size:"invisible",

callback:()=>{

console.log("reCAPTCHA verified");

},

'expired-callback':()=>{

console.log("reCAPTCHA expired");

}

}

);

return recaptchaVerifier;

}


// ================================
// SEND CODE
// ================================

form.addEventListener("submit",async(e)=>{

e.preventDefault();

if(loading) return;

loading=true;

sendBtn.disabled=true;

sendBtn.innerHTML=`
<i class="fa-solid fa-spinner fa-spin"></i>
Sending...
`;

try{
const rawNumber = phoneInput.value.trim();

if (rawNumber === "") {
  alert("Please enter your phone number.");
  loading = false;
  sendBtn.disabled = false;
  sendBtn.innerHTML = `
    <i class="fa-solid fa-paper-plane"></i>
    Send Code
  `;
  return;
}

const number = iti.getNumber();

}

const appVerifier=initRecaptcha();

const confirmationResult=

await signInWithPhoneNumber(

auth,

phoneNumber,

appVerifier

);

// Save globally
window.confirmationResult=confirmationResult;

sendBtn.innerHTML=`
<i class="fa-solid fa-check"></i>
Code Sent
`;

loading=false;

sendBtn.disabled=false;

// OTP popup
showOTPBox();

}catch(error){

console.error(error);

alert(

(error.code || "Error")

+"\n\n"+

(error.message || "Failed to send code")

);

loading=false;

sendBtn.disabled=false;

sendBtn.innerHTML=`
<i class="fa-solid fa-paper-plane"></i>
Send Code
`;

}

});

// ======================================
// RWANDA Me&You
// auth.js - PART 2
// ======================================


// ================================
// OTP POPUP
// ================================

function showOTPBox(){

const overlay=document.createElement("div");

overlay.id="otpOverlay";

overlay.innerHTML=`

<div style="
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,.65);
display:flex;
justify-content:center;
align-items:center;
z-index:9999;
padding:20px;
">

<div style="
width:100%;
max-width:360px;
background:#fff;
border-radius:22px;
padding:25px;
text-align:center;
box-shadow:0 20px 60px rgba(0,0,0,.25);
">

<h2 style="
margin-bottom:10px;
color:#0077C8;
">
Verify Phone
</h2>

<p style="
margin-bottom:20px;
color:#555;
font-size:14px;
">
Enter the 6 digit code sent to your phone.
</p>

<input
id="otpInput"
type="text"
maxlength="6"
placeholder="123456"

style="
width:100%;
padding:15px;
font-size:22px;
letter-spacing:6px;
text-align:center;
border:2px solid #ddd;
border-radius:14px;
outline:none;
">

<button
id="verifyBtn"

style="
margin-top:20px;
width:100%;
padding:15px;
border:none;
border-radius:14px;
cursor:pointer;
font-size:16px;
font-weight:700;
background:linear-gradient(135deg,#0077C8,#00A86B);
color:white;
">

Verify Code

</button>

<button
id="closeOTP"

style="
margin-top:10px;
width:100%;
padding:13px;
border:none;
border-radius:14px;
cursor:pointer;
font-size:15px;
font-weight:600;
background:#efefef;
">

Cancel

</button>

</div>

</div>

`;

document.body.appendChild(overlay);


// ================================
// CLOSE
// ================================

document
.getElementById("closeOTP")
.onclick=()=>{

overlay.remove();

};


// ================================
// VERIFY OTP
// ================================

document
.getElementById("verifyBtn")
.onclick=async()=>{

const verifyBtn=
document.getElementById("verifyBtn");

const code=
document.getElementById("otpInput")
.value
.trim();

if(code.length!==6){

alert("Enter valid OTP");

return;

}

verifyBtn.disabled=true;

verifyBtn.innerHTML=`
<i class="fa-solid fa-spinner fa-spin"></i>
Verifying...
`;

try{

const result=

await window
.confirmationResult
.confirm(code);

console.log(result.user);

window.location.href="home.html";

}catch(error){

console.error(error);

alert(

error.code+

"\n\n"+

error.message

);

verifyBtn.disabled=false;

verifyBtn.innerHTML="Verify Code";

}

};

}



// ================================
// GUEST LOGIN
// ================================

guestBtn.addEventListener("click",()=>{

window.location.href="home.html";

});



// ================================
// ENTER KEY OTP
// ================================

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

const btn=
document.getElementById("verifyBtn");

if(btn){

btn.click();

}

}

});
