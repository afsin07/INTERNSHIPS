// =========================================================
// MediPredict — shared frontend-only "auth" + storage layer
// Everything lives in localStorage. No backend / server.
// NOTE: This is a prototype pattern only — passwords are
// stored in plain text in the browser, which is NOT secure
// and should never be used for a real product with real
// health data. See README for details.
// =========================================================

const MP_USERS_KEY = "mp_users";
const MP_SESSION_KEY = "mp_session";
const MP_REPORTS_PREFIX = "mp_reports_"; // + email

// ---------- USERS ----------

function mpGetUsers() {
    return JSON.parse(localStorage.getItem(MP_USERS_KEY)) || [];
}

function mpSaveUsers(users) {
    localStorage.setItem(MP_USERS_KEY, JSON.stringify(users));
}

function mpFindUserByEmail(email) {
    return mpGetUsers().find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
    );
}

function mpRegisterUser(user) {
    const users = mpGetUsers();

    if (mpFindUserByEmail(user.email)) {
        return { ok: false, message: "An account with this email already exists." };
    }

    users.push(user);
    mpSaveUsers(users);
    return { ok: true };
}

// ---------- SESSION ----------

function mpLogin(email, password) {
    const user = mpFindUserByEmail(email);

    if (!user || user.password !== password) {
        return { ok: false, message: "Invalid email or password." };
    }

    localStorage.setItem(MP_SESSION_KEY, user.email);
    return { ok: true, user };
}

function mpLogout() {
    localStorage.removeItem(MP_SESSION_KEY);
}

function mpCurrentUser() {
    const email = localStorage.getItem(MP_SESSION_KEY);
    if (!email) return null;
    return mpFindUserByEmail(email) || null;
}

// Call at the top of any page that requires login.
// Redirects to login.html if nobody is signed in.
function mpRequireLogin() {
    const user = mpCurrentUser();
    if (!user) {
        window.location.href = "login.html";
        return null;
    }
    return user;
}

// ---------- REPORTS ----------

function mpReportsKey(email) {
    return MP_REPORTS_PREFIX + email.toLowerCase();
}

function mpGetReports(email) {
    return JSON.parse(localStorage.getItem(mpReportsKey(email))) || [];
}

function mpSaveReport(email, report) {
    const reports = mpGetReports(email);
    reports.unshift(report); // newest first
    localStorage.setItem(mpReportsKey(email), JSON.stringify(reports));
}

function mpDeleteReport(email, reportId) {
    const reports = mpGetReports(email).filter((r) => r.id !== reportId);
    localStorage.setItem(mpReportsKey(email), JSON.stringify(reports));
}

function mpGetReportById(email, reportId) {
    return mpGetReports(email).find((r) => r.id === reportId) || null;
}
