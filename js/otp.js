import { auth } from "./firebase.js";


// =========================
// ELEMENTS
// =========================

const form = document.querySelector("#otpForm");
const otpInput = document.querySelector("#otpInput");


// =========================
// VERIFY OTP
// =========================

form.addEventListener("submit", async (e) => {
e.preventDefault();

const code = otpInput.value;

if (!code || code.length < 6) {
alert("Enter valid OTP");
return;
}

try {

// get stored confirmation
const confirmationResult = window.confirmationResult;

if (!confirmationResult) {
alert("Session expired. Please go back and resend code.");
window.location.href = "index.html";
return;
}

// verify code
const result = await confirmationResult.confirm(code);

const user = result.user;

console.log("Logged in user:", user.phoneNumber);

// SUCCESS → HOME
window.location.href = "home.html";

} catch (error) {
console.error(error);
alert("Invalid OTP code. Try again.");
}

});
