import { auth } from "./firebase.js";
import {
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// ===============================
// PHONE INPUT (COUNTRY CODES FIX)
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
// RECAPTCHA (FIXED SAFE INIT)
// ===============================

window.recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{
size: "invisible"
}
);


// ===============================
// GET FULL NUMBER (FIXED)
// ===============================

function getPhoneNumber() {
const number = iti.getNumber();
return number;
}


// ===============================
// BUTTON ELEMENTS
// ===============================

const form = document.querySelector("#loginForm");
const sendBtn = document.querySelector("#sendCode");
const guestBtn = document.querySelector("#guestBtn");

let isSending = false;


// ===============================
// SEND OTP (FIXED NO STUCK)
// ===============================

form.addEventListener("submit", async (e) => {
e.preventDefault();

if (isSending) return;

isSending = true;

sendBtn.innerHTML = "Sending...";
sendBtn.disabled = true;

try {

const number = getPhoneNumber();

if (!number || number.length < 8) {
alert("Enter valid phone number");

resetButton();
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

// move to OTP screen
showOTPInput();

} catch (err) {
console.error(err);
alert("Failed to send code. Try again.");

resetButton();
}

});


// ===============================
// RESET BUTTON (IMPORTANT FIX)
// ===============================

function resetButton() {
isSending = false;
sendBtn.innerHTML = "Send Verification Code";
sendBtn.disabled = false;
}


// ===============================
// GUEST BUTTON (FIXED)
// ===============================

guestBtn.addEventListener("click", () => {
window.location.href = "home.html";
});


// ===============================
// OTP SCREEN HOOK
// ===============================

window.showOTPInput = function () {
alert("OTP sent! (Next step will be verification screen)");
resetButton();
};
