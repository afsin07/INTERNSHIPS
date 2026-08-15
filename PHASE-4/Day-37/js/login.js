const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const toggleLoginPassword = document.getElementById("toggleLoginPassword");

// If already logged in, skip straight to the dashboard
if (mpCurrentUser()) {
    window.location.href = "dashboard.html";
}

toggleLoginPassword.addEventListener("click", () => {
    if (loginPassword.type === "password") {
        loginPassword.type = "text";
        toggleLoginPassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        loginPassword.type = "password";
        toggleLoginPassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    loginError.innerText = "";

    const result = mpLogin(loginEmail.value.trim(), loginPassword.value);

    if (!result.ok) {
        loginError.innerText = result.message;
        return;
    }

    window.location.href = "dashboard.html";
});
