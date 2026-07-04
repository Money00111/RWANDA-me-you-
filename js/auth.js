import { auth } from "./firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } 
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// =====================================
// INIT PHONE INPUT (intl-tel-input)
// =====================================

const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "rw",
  preferredCountries: ["rw","ke","ug","tz","ng","us","gb"],
  separateDialCode: true,
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js",
});


// =====================================
// RECAPTCHA
// =====================================

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "invisible",
  }
);


// =====================================
// GET FULL NUMBER
// =====================================

function getPhoneNumber() {
  return iti.getNumber();
}


// =====================================
// SEND OTP
// =====================================

const form = document.querySelector("#loginForm");
const sendBtn = document.querySelector("#sendCode");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    sendBtn.innerText = "Sending...";
    sendBtn.disabled = true;

    const number = getPhoneNumber();

    if (!number) {
      alert("Enter valid phone number");
      sendBtn.innerText = "Send Verification Code";
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

    sendBtn.innerText = "Code Sent ✔";

    // 👉 SHOW OTP SCREEN
    showOTPInput();

  } catch (err) {
    console.error(err);
    alert("Failed to send code");

    sendBtn.innerText = "Send Verification Code";
    sendBtn.disabled = false;
  }
});


// =====================================
// GUEST BUTTON FIX
// =====================================

const guestBtn = document.querySelector(".guest-btn");

guestBtn.addEventListener("click", () => {
  // simple bypass login
  window.location.href = "home.html";
});
