// =====================================================
// MediPredict — Day 38 Login
// Server-side session authentication
// =====================================================

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const toggleLoginPassword =
    document.getElementById("toggleLoginPassword");


// =====================================================
// PASSWORD VISIBILITY
// =====================================================

if (toggleLoginPassword) {

    toggleLoginPassword.addEventListener("click", () => {

        if (loginPassword.type === "password") {

            loginPassword.type = "text";

            toggleLoginPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            loginPassword.type = "password";

            toggleLoginPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

}


// =====================================================
// CHECK EXISTING SERVER SESSION
// =====================================================

async function checkExistingSession() {

    try {

        const response = await fetch(
            "/api/session",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (response.ok) {

            window.location.href =
                "dashboard.html";

        }

    } catch (error) {

        console.error(
            "Session check failed:",
            error
        );

    }

}

checkExistingSession();


// =====================================================
// LOGIN
// =====================================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginError.innerText = "";

    const email =
        loginEmail.value.trim();

    const password =
        loginPassword.value;


    if (!email || !password) {

        loginError.innerText =
            "Please enter email and password.";

        return;

    }


    // Show loading state
    const loginButton =
        loginForm.querySelector("button[type='submit']");

    const originalButtonText =
        loginButton.innerHTML;

    loginButton.disabled = true;

    loginButton.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';


    try {

        const response = await fetch(
            "/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    email: email,

                    password: password

                })

            }
        );


        const result =
            await response.json();


        // =================================================
        // LOGIN FAILED
        // =================================================

        if (!response.ok || !result.success) {

            loginError.innerText =
                result.message ||
                "Invalid email or password.";

            loginButton.disabled = false;

            loginButton.innerHTML =
                originalButtonText;

            return;

        }


        // =================================================
        // LOGIN SUCCESSFUL
        // =================================================

        console.log(
            "✅ Login successful"
        );

        console.log(
            "Logged in user:",
            result.user
        );


        // IMPORTANT:
        // We do NOT store the password
        // or session in localStorage.
        //
        // The server now maintains the session.


        window.location.href =
            "dashboard.html";


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        loginError.innerText =
            "Unable to connect to the server. Please try again.";

        loginButton.disabled = false;

        loginButton.innerHTML =
            originalButtonText;

    }

});