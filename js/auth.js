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
