let formUser = null;

async function initHealthForm() {
    formUser = await mpRequireLogin();
    if (!formUser) return;

    await loadExistingReport();
}

// ============================
// LOGOUT
// ============================

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        await mpLogout();
    });
}


// ============================
// FORM ELEMENTS
// ============================

const form = document.getElementById("healthForm");

const sleepHours = document.getElementById("sleepHours");
const sleepValue = document.getElementById("sleepValue");

const stressLevel = document.getElementById("stressLevel");
const stressValue = document.getElementById("stressValue");

const submitButton = form ? form.querySelector('button[type="submit"]') : null;


// ============================
// SLIDER VALUES
// ============================

if (sleepHours && sleepValue) {
    sleepHours.addEventListener("input", () => {
        sleepValue.innerText = sleepHours.value;
    });
}

if (stressLevel && stressValue) {
    stressLevel.addEventListener("input", () => {
        stressValue.innerText = stressLevel.value;
    });
}


// ============================
// CHECK EDIT MODE
// ============================

const urlParams = new URLSearchParams(window.location.search);

const editId = urlParams.get("edit");

let editMode = Boolean(editId);


// ============================
// HELPER
// ============================

function parseJSON(value, fallback) {

    if (value === null || value === undefined) {
        return fallback;
    }

    if (typeof value === "object") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}


// ============================
// LOAD EXISTING REPORT
// ============================

async function loadExistingReport() {

    if (!editMode || !editId) {
        return;
    }

    try {

        console.log("✏️ Loading report for editing:", editId);

        const response = await fetch(
            `/api/reports/${editId}`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Unable to load report"
            );
        }

        const report = result.report;

        const answers = parseJSON(report.answers, {});

        // ----------------------------
        // Fill normal fields
        // ----------------------------

        if (document.getElementById("bloodPressure")) {
            document.getElementById("bloodPressure").value =
                answers.bloodPressure || "normal";
        }

        if (document.getElementById("bloodSugar")) {
            document.getElementById("bloodSugar").value =
                answers.bloodSugar || "normal";
        }

        if (sleepHours) {
            sleepHours.value = answers.sleepHours ?? 7;
            if (sleepValue) sleepValue.innerText = sleepHours.value;
        }

        if (stressLevel) {
            stressLevel.value = answers.stressLevel ?? 5;
            if (stressValue) stressValue.innerText = stressLevel.value;
        }

        if (document.getElementById("smoking")) {
            document.getElementById("smoking").value =
                answers.smoking || "no";
        }

        if (document.getElementById("alcohol")) {
            document.getElementById("alcohol").value =
                answers.alcohol || "no";
        }

        if (document.getElementById("activity")) {
            document.getElementById("activity").value =
                answers.activity || "active";
        }

        if (document.getElementById("diet")) {
            document.getElementById("diet").value =
                answers.diet || "balanced";
        }


        // ----------------------------
        // Existing conditions
        // ----------------------------

        const existingConditions =
            answers.existingConditions || [];

        document
            .querySelectorAll('input[name="condition"]')
            .forEach((checkbox) => {

                checkbox.checked =
                    existingConditions.includes(checkbox.value);

            });


        // ----------------------------
        // Symptoms
        // ----------------------------

        const symptoms =
            answers.symptoms || [];

        document
            .querySelectorAll('input[name="symptom"]')
            .forEach((checkbox) => {

                checkbox.checked =
                    symptoms.includes(checkbox.value);

            });


        // ----------------------------
        // Change button text
        // ----------------------------

        if (submitButton) {
            submitButton.innerHTML = `
                <i class="fa-solid fa-pen-to-square"></i>
                Update My Report
            `;
        }

        console.log("✅ Report loaded into form");

    } catch (error) {

        console.error("❌ Failed to load report:", error);

        alert(
            "Unable to load this report for editing.\n\n" +
            error.message
        );

        window.location.href = "dashboard.html";
    }
}


// ============================
// SUBMIT FORM
// ============================

if (form) {
    form.addEventListener("submit", async (e) => {

        e.preventDefault();


        // ----------------------------
        // Collect symptoms
        // ----------------------------

        const symptoms = Array.from(
            document.querySelectorAll(
                'input[name="symptom"]:checked'
            )
        ).map((el) => el.value);


        // ----------------------------
        // Collect conditions
        // ----------------------------

        let existingConditions = Array.from(
            document.querySelectorAll(
                'input[name="condition"]:checked'
            )
        ).map((el) => el.value);


        if (existingConditions.length === 0) {
            existingConditions = ["none"];
        }


        // ----------------------------
        // Collect answers
        // ----------------------------

        const answers = {

            bloodPressure:
                document.getElementById("bloodPressure") ? document.getElementById("bloodPressure").value : "normal",

            bloodSugar:
                document.getElementById("bloodSugar") ? document.getElementById("bloodSugar").value : "normal",

            sleepHours:
                sleepHours ? Number(sleepHours.value) : 7,

            stressLevel:
                stressLevel ? Number(stressLevel.value) : 5,

            smoking:
                document.getElementById("smoking") ? document.getElementById("smoking").value : "no",

            alcohol:
                document.getElementById("alcohol") ? document.getElementById("alcohol").value : "no",

            activity:
                document.getElementById("activity") ? document.getElementById("activity").value : "active",

            diet:
                document.getElementById("diet") ? document.getElementById("diet").value : "balanced",

            existingConditions,

            symptoms
        };


        // ----------------------------
        // Generate new prediction
        // ----------------------------

        const prediction =
            mpGeneratePrediction(answers);


        const report = {

            date: new Date().toISOString(),

            answers,

            ...prediction
        };


        try {

            let response;
            let result;


            // ==================================================
            // UPDATE EXISTING REPORT
            // ==================================================

            if (editMode) {

                console.log(
                    "🔄 Updating report in MySQL:",
                    editId
                );

                response = await fetch(
                    `/api/reports/${editId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        credentials: "include",

                        body: JSON.stringify({
                            report
                        })
                    }
                );

                result = await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Failed to update report"
                    );
                }


                console.log(
                    "✅ Report updated successfully:",
                    result
                );


                // Go back to the updated report
                window.location.href =
                    `report.html?id=${editId}`;

                return;
            }


            // ==================================================
            // CREATE NEW REPORT
            // ==================================================

            response = await fetch(
                "/api/reports",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        report
                    })
                }
            );


            result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to save report"
                );
            }


            console.log(
                "✅ Report created in MySQL:",
                result
            );


            window.location.href =
                `report.html?id=${result.id}`;

        } catch (error) {

            console.error(
                "❌ Database operation failed:",
                error
            );

            alert(
                "Unable to save your report.\n\n" +
                error.message
            );
        }
    });
}


// ============================
// START
// ============================

initHealthForm();