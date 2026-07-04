import { auth } from "./firebase.js";
import {
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// ===============================
// INIT PHONE INPUT
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
// RECAPTCHA (SAFE INIT)
// ===============================

window.recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{ size: "invisible" }
);


// ===============================
// BUTTONS
// ===============================

const form = document.querySelector("#loginForm");
const sendBtn = document.querySelector("#sendCode");
const guestBtn = document.querySelector("#guestBtn");

let loading = false;


// ===============================
// SEND CODE (FIXED 100%)
// ===============================

form.addEventListener("submit", async (e) => {
e.preventDefault();

if (loading) return;

loading = true;
sendBtn.innerText = "Sending...";
sendBtn.disabled = true;

try {

const number = iti.getNumber();

if (!number) throw new Error("Invalid number");

const appVerifier = window.recaptchaVerifier;

const confirmation = await signInWithPhoneNumber(
auth,
number,
appVerifier
);

window.confirmationResult = confirmation;

sendBtn.innerText = "Code Sent ✔";

// next step (you will add OTP page later)
alert("OTP sent to " + number);

} catch (err) {
console.log(err);

alert("Failed to send code");

sendBtn.innerText = "Send Code";
sendBtn.disabled = false;
loading = false;
}
});


// ===============================
// GUEST (WORKING 100%)
// ===============================

guestBtn.addEventListener("click", () => {
window.location.href = "home.html";
});
