// =========================
// SELECT ELEMENTS
// =========================

const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const terms = document.getElementById("terms");
const termsError = document.getElementById("termsError");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const togglePassword = document.getElementById("togglePassword");

const modal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");


// =========================
// REGEX
// =========================

const nameRegex = /^[A-Za-z ]{3,40}$/;

const emailRegex =
/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const phoneRegex =
/^[6-9]\d{9}$/;

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


// =========================
// ERROR FUNCTIONS
// =========================

function setError(input,message){

    input.parentElement.querySelector("small").innerText=message;

    input.style.borderColor="#ef4444";

}

function clearError(input){

    input.parentElement.querySelector("small").innerText="";

    input.style.borderColor="#22c55e";

}


// =========================
// LIVE VALIDATION
// =========================

nameInput.addEventListener("input",()=>{

    if(!nameRegex.test(nameInput.value.trim())){

        setError(nameInput,"Enter a valid full name");

    }

    else{

        clearError(nameInput);

    }

});

emailInput.addEventListener("input",()=>{

    if(!emailRegex.test(emailInput.value.trim())){

        setError(emailInput,"Invalid email");

    }

    else{

        clearError(emailInput);

    }

});

phoneInput.addEventListener("input",()=>{

    if(!phoneRegex.test(phoneInput.value.trim())){

        setError(phoneInput,"Invalid phone number");

    }

    else{

        clearError(phoneInput);

    }

});

ageInput.addEventListener("input",()=>{

    const age=Number(ageInput.value);

    if(age<1||age>120){

        setError(ageInput,"Enter valid age");

    }

    else{

        clearError(ageInput);

    }

});


// =========================
// PASSWORD STRENGTH
// =========================

passwordInput.addEventListener("input",()=>{

    const value=passwordInput.value;

    let strength=0;

    if(value.length>=8) strength++;

    if(/[A-Z]/.test(value)) strength++;

    if(/[a-z]/.test(value)) strength++;

    if(/\d/.test(value)) strength++;

    if(/[@$!%*?&]/.test(value)) strength++;

    switch(strength){

        case 0:

        case 1:

            strengthBar.style.width="20%";

            strengthBar.style.background="#ef4444";

            strengthText.innerText="Weak Password";

            break;

        case 2:

        case 3:

            strengthBar.style.width="60%";

            strengthBar.style.background="#f59e0b";

            strengthText.innerText="Medium Password";

            break;

        case 4:

        case 5:

            strengthBar.style.width="100%";

            strengthBar.style.background="#22c55e";

            strengthText.innerText="Strong Password";

            break;

    }

});


// =========================
// SHOW PASSWORD
// =========================

togglePassword.addEventListener("click",()=>{

    if(passwordInput.type==="password"){

        passwordInput.type="text";

        togglePassword.innerHTML='<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        passwordInput.type="password";

        togglePassword.innerHTML='<i class="fa-solid fa-eye"></i>';

    }

});


// =========================
// FORM SUBMIT
// =========================

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    let valid=true;

    if(!nameRegex.test(nameInput.value.trim())){

        setError(nameInput,"Enter valid name");

        valid=false;

    }

    if(!emailRegex.test(emailInput.value.trim())){

        setError(emailInput,"Enter valid email");

        valid=false;

    }

    if(!phoneRegex.test(phoneInput.value.trim())){

        setError(phoneInput,"Enter valid phone");

        valid=false;

    }

    const age=Number(ageInput.value);

    if(age<1||age>120){

        setError(ageInput,"Enter valid age");

        valid=false;

    }

    if(!passwordRegex.test(passwordInput.value)){

        setError(passwordInput,
        "Password must contain uppercase, lowercase, number & symbol");

        valid=false;

    }

    if(passwordInput.value!==confirmPasswordInput.value){

        setError(confirmPasswordInput,
        "Passwords do not match");

        valid=false;

    }

    else{

        clearError(confirmPasswordInput);

    }

    const gender=document.querySelector(
        'input[name="gender"]:checked'
    );

    if(!gender){

        valid=false;

        document.querySelector(".gender-box small").innerText=
        "Select gender";

    }

    else{

        document.querySelector(".gender-box small").innerText="";

    }

    if(!terms.checked){

        valid=false;

        termsError.innerText="Accept Terms & Conditions";

    }

    else{

        termsError.innerText="";

    }

    if(valid){

        modal.style.display="flex";

        form.reset();

        strengthBar.style.width="0";

        strengthText.innerText="";

    }

});


// =========================
// CLOSE MODAL
// =========================

closeModal.addEventListener("click",()=>{

    modal.style.display="none";

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

});