const formUser = mpRequireLogin();

document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    mpLogout();
    window.location.href = "login.html";
});

const sleepHours = document.getElementById("sleepHours");
const sleepValue = document.getElementById("sleepValue");
const stressLevel = document.getElementById("stressLevel");
const stressValue = document.getElementById("stressValue");

sleepHours.addEventListener("input", () => {
    sleepValue.innerText = sleepHours.value;
});

stressLevel.addEventListener("input", () => {
    stressValue.innerText = stressLevel.value;
});

document.getElementById("healthForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const symptoms = Array.from(
        document.querySelectorAll('input[name="symptom"]:checked')
    ).map((el) => el.value);

    let existingConditions = Array.from(
        document.querySelectorAll('input[name="condition"]:checked')
    ).map((el) => el.value);

    if (existingConditions.length === 0) existingConditions = ["none"];

    const answers = {
        bloodPressure: document.getElementById("bloodPressure").value,
        bloodSugar: document.getElementById("bloodSugar").value,
        sleepHours: Number(sleepHours.value),
        stressLevel: Number(stressLevel.value),
        smoking: document.getElementById("smoking").value,
        alcohol: document.getElementById("alcohol").value,
        activity: document.getElementById("activity").value,
        diet: document.getElementById("diet").value,
        existingConditions,
        symptoms,
    };

    const prediction = mpGeneratePrediction(answers);

    const report = {
        id: "r_" + Date.now(),
        date: new Date().toISOString(),
        answers,
        ...prediction,
    };

    mpSaveReport(formUser.email, report);

    window.location.href = "report.html?id=" + report.id;
});
