import { auth } from "./firebase.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const form = document.getElementById("loginForm");
const phoneInput = document.getElementById("phone");
const sendBtn = document.getElementById("sendCode");

let recaptchaVerifier;

function initRecaptcha() {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible"
    });
  }
  return recaptchaVerifier;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phoneNumber = window.intlTelInputGlobals
    .getInstance(phoneInput)
    .getNumber();

  const appVerifier = initRecaptcha();

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );

    window.confirmationResult = confirmationResult;

    window.location.href = "otp.html";
  } catch (error) {
    alert(error.message);
  }
});
