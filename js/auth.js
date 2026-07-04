import { auth } from "./firebase.js";
import {
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// ===============================
// PHONE INPUT (COUNTRY CODES)
// ===============================

const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
initialCountry: "rw",
preferredCountries: ["rw","ke","ug","tz","ng","us","gb"],
separateDialCode: true,
utilsScript:
"https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js",
});


// ===============================
// RECAPTCHA
// ===============================

window.recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{
size: "invisible"
}
);


// ===============================
// GET FULL NUMBER
// ===============================

function getNumber() {
return iti.getNumber(); // +250..., +254...
}


// ===============================
// SEND CODE (FIXED)
// ===============================

const form = document.querySelector("#loginForm");
const sendBtn = document.querySelector("#sendCode");

form.addEventListener("submit", async (e) => {
e.preventDefault();

sendBtn.innerHTML = "Sending...";
sendBtn.disabled = true;

try {

const number = getNumber();

if (!number) {
alert("Enter valid phone number");
sendBtn.innerHTML = "Send Verification Code";
sendBtn.disabled = false;
return;
}

const appVerifier = window.recaptchaVerifier;

const confirmation = await signInWithPhoneNumber(
auth,
number,
appVerifier
);

window.confirmationResult = confirmation;

sendBtn.innerHTML = "Code Sent ✔";

// 👉 NEXT STEP: OTP SCREEN (you already have)
showOTPInput();

} catch (err) {
console.error(err);

alert("Failed to send code");

sendBtn.innerHTML = "Send Verification Code";
sendBtn.disabled = false;
}
});


// ===============================
// GUEST BUTTON FIX
// ===============================

document.querySelector("#guestBtn")
.addEventListener("click", () => {
window.location.href = "home.html";
});
