const form =
document.getElementById("signupForm");

const fullname =
document.getElementById("fullname");

const email =
document.getElementById("email");

const password =
document.getElementById("password");

const confirmPassword =
document.getElementById("confirmPassword");

const strengthBar =
document.getElementById("strengthBar");

function showToast(message){

const toast =
document.getElementById("toast");

toast.innerText = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

function validateEmail(email){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(email);

}

function validatePassword(password){

return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
.test(password);

}

password.addEventListener("input",()=>{

const value = password.value;

document.getElementById("lower").innerHTML =
/[a-z]/.test(value)
? "✅ Lowercase"
: "❌ Lowercase";

document.getElementById("upper").innerHTML =
/[A-Z]/.test(value)
? "✅ Uppercase"
: "❌ Uppercase";

document.getElementById("number").innerHTML =
/\d/.test(value)
? "✅ Number"
: "❌ Number";

document.getElementById("length").innerHTML =
value.length >= 8
? "✅ 8 Characters"
: "❌ 8 Characters";

let strength = 0;

if(/[a-z]/.test(value)) strength++;
if(/[A-Z]/.test(value)) strength++;
if(/\d/.test(value)) strength++;
if(value.length>=8) strength++;

strengthBar.style.width =
(strength*25)+"%";

});

document
.getElementById("togglePassword")
.addEventListener("click",()=>{

const icon =
document.querySelector(
"#togglePassword i"
);

if(password.type==="password"){

password.type="text";

icon.classList.replace(
"fa-eye",
"fa-eye-slash"
);

}else{

password.type="password";

icon.classList.replace(
"fa-eye-slash",
"fa-eye"
);

}

});

document
.getElementById("toggleConfirm")
.addEventListener("click",()=>{

const icon =
document.querySelector(
"#toggleConfirm i"
);

if(confirmPassword.type==="password"){

confirmPassword.type="text";

icon.classList.replace(
"fa-eye",
"fa-eye-slash"
);

}else{

confirmPassword.type="password";

icon.classList.replace(
"fa-eye-slash",
"fa-eye"
);

}

});

document
.getElementById("generatePassword")
.addEventListener("click",()=>{

const upper =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lower =
"abcdefghijklmnopqrstuvwxyz";

const numbers =
"0123456789";

const symbols =
"@#$%&*!?";

const all =
upper + lower +
numbers + symbols;

let generated = "";

generated += upper[Math.floor(Math.random()*upper.length)];
generated += lower[Math.floor(Math.random()*lower.length)];
generated += numbers[Math.floor(Math.random()*numbers.length)];
generated += symbols[Math.floor(Math.random()*symbols.length)];

for(let i=0;i<12;i++){

generated += all[
Math.floor(
Math.random()*all.length
)
];

}

generated =
generated
.split("")
.sort(()=>Math.random()-0.5)
.join("");

password.value =
generated;

password.dispatchEvent(
new Event("input")
);

showToast(
"Strong password generated!"
);

});

document
.getElementById("copyPassword")
.addEventListener("click",()=>{

if(password.value===""){

showToast(
"Generate password first!"
);

return;

}

navigator.clipboard.writeText(
password.value
);

showToast(
"Password copied!"
);

});

document
.getElementById("themeToggle")
.addEventListener("click",()=>{

document.body.classList.toggle(
"dark"
);

});

form.addEventListener("submit",(e)=>{

e.preventDefault();

if(
fullname.value.trim()==="" ||
email.value.trim()==="" ||
password.value.trim()==="" ||
confirmPassword.value.trim()===""
){

showToast(
"Please fill all fields"
);

return;
}

if(
!validateEmail(email.value)
){

showToast(
"Invalid email"
);

return;
}

if(
!validatePassword(password.value)
){

showToast(
"Weak password"
);

return;
}

if(
password.value !==
confirmPassword.value
){

showToast(
"Passwords do not match"
);

return;
}

confetti({
particleCount:150,
spread:90
});

showToast(
"Registration Successful!"
);

form.reset();

strengthBar.style.width="0%";

});