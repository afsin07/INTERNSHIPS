// =====================================================
// MediPredict - Day 37
// MySQL Registration + bcrypt Password Hashing
// =====================================================

const registerForm = document.getElementById("registerForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const termsInput = document.getElementById("terms");

const successModal =
    document.getElementById("successModal");

const closeModal =
    document.getElementById("closeModal");


// =====================================================
// PASSWORD VISIBILITY
// =====================================================

const togglePassword =
    document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            passwordInput.type = "password";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

}


// =====================================================
// PASSWORD STRENGTH
// =====================================================

const strengthBar =
    document.getElementById("strengthBar");

const strengthText =
    document.getElementById("strengthText");

if (passwordInput) {

    passwordInput.addEventListener("input", () => {

        const password =
            passwordInput.value;

        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;


        if (password.length === 0) {

            strengthBar.style.width = "0%";
            strengthText.innerText = "";

        } else if (strength <= 2) {

            strengthBar.style.width = "35%";
            strengthText.innerText = "Weak password";

        } else if (strength === 3) {

            strengthBar.style.width = "65%";
            strengthText.innerText = "Medium password";

        } else {

            strengthBar.style.width = "100%";
            strengthText.innerText = "Strong password";

        }

    });

}


// =====================================================
// REGISTER
// =====================================================

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("🟢 Registration form submitted");


    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    // =================================================
    // VALIDATION
    // =================================================

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (password.length < 8) {
        alert("Password must contain at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (!termsInput.checked) {
        alert("Please accept the Terms & Conditions.");
        return;
    }


    // =================================================
    // BUTTON
    // =================================================

    const button =
        registerForm.querySelector(
            'button[type="submit"]'
        );

    const originalText =
        button.innerHTML;

    button.disabled = true;

    button.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Creating Account...
    `;


    try {

        console.log("📤 Sending registration to server...");
        console.log("Email:", email);


        // =================================================
        // SEND TO NODE.JS
        // =================================================

        const response =
            await fetch("/api/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,

                    email: email,

                    password: password

                })

            });


        console.log(
            "📥 Server response:",
            response.status
        );


        let result;

        try {
            result = await response.json();
        } catch (parseErr) {
            throw new Error("Server error (Invalid response format)");
        }


        console.log(
            "📦 Server result:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Registration failed"
            );

        }


        // =================================================
        // SUCCESS
        // =================================================

        console.log(
            "✅ Registration successful!"
        );


        registerForm.reset();


        if (strengthBar) {
            strengthBar.style.width = "0%";
        }

        if (strengthText) {
            strengthText.innerText = "";
        }


        if (successModal) {

            successModal.style.display =
                "flex";

        } else {

            alert(
                "Registration successful!"
            );

        }


    } catch (error) {

        console.error(
            "❌ Registration error:",
            error
        );


        alert(
            "Registration failed:\n\n" +
            error.message
        );


    } finally {

        button.disabled = false;

        button.innerHTML =
            originalText;

    }

});


// =====================================================
// CLOSE SUCCESS MODAL
// =====================================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        () => {

            successModal.style.display =
                "none";

            window.location.href =
                "login.html";

        }
    );

}