const form = document.getElementById("otpForm");
const otpInput = document.getElementById("otpInput");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = otpInput.value;

  if (!window.confirmationResult) {
    alert("Session expired");
    return;
  }

  try {
    await window.confirmationResult.confirm(code);
    window.location.href = "home.html";
  } catch (err) {
    alert("Invalid code");
  }
});
