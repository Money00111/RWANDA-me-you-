import { auth } from "./firebase.js";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// =====================================
// RWANDA Me&You - AUTH PART 1
// Phone Input + Country Styling
// =====================================


// 🌍 Initialize international phone input
const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "rw",
  preferredCountries: ["rw", "ke", "ug", "tz", "ng", "us", "gb"],
  separateDialCode: true,
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js",
});


// 🎨 Stylish input focus effects
phoneInput.style.padding = "16px";
phoneInput.style.borderRadius = "18px";
phoneInput.style.border = "2px solid rgba(255,255,255,0.3)";
phoneInput.style.fontSize = "16px";
phoneInput.style.fontWeight = "600";
phoneInput.style.outline = "none";
phoneInput.style.width = "100%";
phoneInput.style.transition = "0.3s";

phoneInput.addEventListener("focus", () => {
  phoneInput.style.border = "2px solid #FAD201";
  phoneInput.style.boxShadow = "0 0 15px rgba(250,210,1,0.4)";
});

phoneInput.addEventListener("blur", () => {
  phoneInput.style.border = "2px solid rgba(255,255,255,0.3)";
  phoneInput.style.boxShadow = "none";
});


// 📱 Format phone number properly
function getFullPhoneNumber() {
  return iti.getNumber(); // returns +2507..., +254..., etc.
}


// =====================================
// Firebase Recaptcha setup
// =====================================

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "invisible",
    callback: (response) => {
      console.log("Recaptcha solved");
    },
  }
);


// =====================================
// Send OTP (PART 1)
// =====================================

const form = document.querySelector("#loginForm");
const sendBtn = document.querySelector("#sendCode");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  sendBtn.innerHTML = "Sending...";
  sendBtn.disabled = true;

  try {
    const phoneNumber = getFullPhoneNumber();

    console.log("Sending OTP to:", phoneNumber);

    const appVerifier = window.recaptchaVerifier;

    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

    window.confirmationResult = confirmation;

    sendBtn.innerHTML = "Code Sent ✔";
    console.log("OTP sent successfully");

    // next step will be OTP verification (Part 2)

  } catch (error) {
    console.error(error);

    sendBtn.innerHTML = "Send Verification Code";
    sendBtn.disabled = false;

    alert("Error sending code. Check number or internet.");
  }
});

  
