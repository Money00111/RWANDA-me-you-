import { auth } from "./firebase.js";
import {
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// =========================
// INIT PHONE INPUT
// =========================

const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
initialCountry: "rw",
preferredCountries: ["rw","ke","ug","tz","ng","us","gb"],
separateDialCode: true,
utilsScript:
"https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"
});


// =========================
// RECAPTCHA
// =========================

window.recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{ size: "invisible" }
);


// =========================
// ELEMENTS
// =========================

const form = document.querySelector("#loginForm");
const sendBtn = document.querySelector("#sendCode");
const guestBtn = document.querySelector("#guestBtn");

let loading = false;


// =========================
// SEND OTP (CLEAN)
// =========================

form.addEventListener("submit", async (e) => {
e.preventDefault();

if (loading) return;
loading = true;

sendBtn.innerText = "Sending...";
sendBtn.disabled = true;

try {

const number = iti.getNumber();

if (!number) throw new Error("Invalid phone number");

const confirmation = await signInWithPhoneNumber(
auth,
number,
window.recaptchaVerifier
);

window.confirmationResult = confirmation;

sendBtn.innerText = "Code Sent ✔";

alert("OTP sent to " + number);

} catch(error){

console.error(error);

alert(error.code + "\n\n" + error.message);

}
sendBtn.innerText = "Send Code";
sendBtn.disabled = false;
loading = false;
}

});


// =========================
// GUEST LOGIN
// =========================

guestBtn.addEventListener("click", () => {
window.location.href = "home.html";
});

function showOTPBox() {

const box = document.createElement("div");

box.innerHTML = `
<div style="
position:fixed;
top:0;left:0;
width:100%;height:100%;
background:rgba(0,0,0,0.6);
display:flex;
justify-content:center;
align-items:center;
z-index:9999;
">

<div style="
background:white;
padding:25px;
border-radius:15px;
width:90%;
max-width:350px;
text-align:center;
font-family:Poppins;
">

<h2>Enter OTP</h2>

<p>Code sent to your phone</p>

<input id="otpInput" type="text" maxlength="6"
style="
width:100%;
padding:12px;
margin-top:15px;
font-size:18px;
text-align:center;
border:1px solid #ccc;
border-radius:10px;
outline:none;
">

<button id="verifyBtn"
style="
margin-top:15px;
width:100%;
padding:12px;
border:none;
border-radius:10px;
background:linear-gradient(135deg,#0077C8,#00A86B);
color:white;
font-weight:700;
cursor:pointer;
">
Verify
</button>

</div>

</div>
`;

document.body.appendChild(box);


// =========================
// VERIFY OTP
// =========================

document.getElementById("verifyBtn").onclick = async () => {

const code = document.getElementById("otpInput").value;

if (!code || code.length < 6) {
alert("Enter valid OTP");
return;
}

try {

document.getElementById("verifyBtn").innerText = "Verifying...";

const result = await window.confirmationResult.confirm(code);

const user = result.user;

console.log("Logged in:", user.phoneNumber);

// success → go home
window.location.href = "home.html";

} catch (err) {
console.log(err);
alert("Invalid OTP");
document.getElementById("verifyBtn").innerText = "Verify";
}

};

  }
