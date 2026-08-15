// =====================================================
// MediPredict - Day 37 Registration
// =====================================================

const registerForm = document.getElementById("registerForm");


// =====================================================
// PASSWORD VISIBILITY
// =====================================================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput) {

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

if (passwordInput) {

    passwordInput.addEventListener("input", () => {

        const password = passwordInput.value;

        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const bar = document.getElementById("strengthBar");
        const text = document.getElementById("strengthText");

        if (!bar || !text) return;

        if (password.length === 0) {

            bar.style.width = "0%";
            text.innerText = "";

        } else if (strength <= 2) {

            bar.style.width = "35%";
            text.innerText = "Weak password";

        } else if (strength === 3) {

            bar.style.width = "65%";
            text.innerText = "Medium password";

        } else {

            bar.style.width = "100%";
            text.innerText = "Strong password";

        }

    });

}


// =====================================================
// REGISTRATION
// =====================================================

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        console.log("=================================");
        console.log("🚀 DAY 37 REGISTRATION STARTED");
        console.log("=================================");


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const terms =
            document.getElementById("terms").checked;


        // ---------------------------------------------
        // VALIDATION
        // ---------------------------------------------

        if (!name) {

            alert("Please enter your name.");
            return;

        }


        if (!email) {

            alert("Please enter your email.");
            return;

        }


        if (password.length < 8) {

            alert(
                "Password must contain at least 8 characters."
            );

            return;

        }


        if (password !== confirmPassword) {

            alert("Passwords do not match.");
            return;

        }


        if (!terms) {

            alert(
                "Please accept the Terms & Conditions."
            );

            return;

        }


        // ---------------------------------------------
        // BUTTON
        // ---------------------------------------------

        const button =
            registerForm.querySelector(
                'button[type="submit"]'
            );

        const oldText =
            button.innerHTML;

        button.disabled = true;

        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Creating Account...
        `;


        try {

            console.log("📤 Sending data to /api/register");

            console.log({
                name: name,
                email: email
            });


            // =========================================
            // SEND TO NODE.JS
            // =========================================

            const response = await fetch(
                "/api/register",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        password: password

                    })

                }
            );


            console.log(
                "📥 Server status:",
                response.status
            );


            const result =
                await response.json();


            console.log(
                "📥 Server response:",
                result
            );


            // =========================================
            // FAILED
            // =========================================

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Registration failed"
                );

            }


            // =========================================
            // SUCCESS
            // =========================================

            console.log(
                "✅ USER CREATED IN MYSQL"
            );

            console.log(
                "User ID:",
                result.userId
            );


            alert(
                "Registration successful!\n\n" +
                "User ID: " +
                result.userId
            );


            // Clear form

            registerForm.reset();


            // Reset password strength

            const bar =
                document.getElementById("strengthBar");

            const text =
                document.getElementById("strengthText");

            if (bar) {
                bar.style.width = "0%";
            }

            if (text) {
                text.innerText = "";
            }


        } catch (error) {

            console.error(
                "❌ REGISTRATION ERROR:",
                error
            );


            alert(
                "Registration failed.\n\n" +
                error.message
            );


        } finally {

            button.disabled = false;

            button.innerHTML =
                oldText;

        }

    });

}