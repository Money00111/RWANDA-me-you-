import { auth } from "./firebase.js";
import {
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// =============================
// PHONE INPUT (intl-tel-input)
// =============================

const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
initialCountry: "rw",
preferredCountries: ["rw","ke","ug","tz","ng","us","gb"],
separateDialCode: true,
utilsScript:
"https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"
});


// =============================
// RECAPTCHA (SAFE INIT)
// =============================

let recaptchaVerifier;

function initRecaptcha() {
if (!recaptchaVerifier) {
recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{
size: "invisible"
}
);
}
return recaptchaVerifier;
}


// =============================
// ELEMENTS
// =============================

const form = document.querySelector("#loginForm");
const sendBtn = document.querySelector("#sendCode");
const guestBtn = document.querySelector("#guestBtn");

let loading = false;


// =============================
// SEND CODE (FIXED CORE)
// =============================
window.confirmationResult = confirmation;
window.location.href = "otp.html";

form.addEventListener("submit", async (e) => {
e.preventDefault();

if (loading) return;

loading = true;
sendBtn.innerHTML = "Sending...";
sendBtn.disabled = true;

try {

// get phone number
const number = iti.getNumber();

if (!number || number.length < 8) {
throw new Error("Invalid phone number");
}

// init recaptcha safely
const appVerifier = initRecaptcha();

// send OTP
const confirmation = await signInWithPhoneNumber(
auth,
number,
appVerifier
);

// store globally for OTP page later
window.confirmationResult = confirmation;

alert("OTP sent to " + number);

// SUCCESS STATE
sendBtn.innerHTML = "Code Sent ✔";

} catch (error) {

console.error("AUTH ERROR:", error.message);

// CLEAN ERROR MESSAGE
alert("Failed to send code. Check phone or Firebase setup.");

sendBtn.innerHTML = "Send Code";
sendBtn.disabled = false;
loading = false;
}

});


// =============================
// GUEST LOGIN (FIXED)
// =============================

guestBtn.addEventListener("click", () => {
window.location.href = "home.html";
});
