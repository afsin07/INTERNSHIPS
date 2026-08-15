// =========================================================
// MediPredict — Shared Server-Side Session Auth Layer (Day 38)
// Single Source of Truth: Server express-session Cookie
// =========================================================

/**
 * Checks active server-side express-session.
 * @returns {Promise<Object|null>} The logged in user object or null.
 */
async function mpCheckSession() {
    try {
        const response = await fetch("/api/session", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        if (data && data.success && data.loggedIn) {
            return data.user;
        }

        return null;
    } catch (error) {
        console.error("Session verification failed:", error);
        return null;
    }
}

/**
 * Returns current user from server session.
 * @returns {Promise<Object|null>}
 */
async function mpCurrentUser() {
    return await mpCheckSession();
}

/**
 * Call on protected pages. Redirects to login.html if session does not exist.
 * @returns {Promise<Object|null>}
 */
async function mpRequireLogin() {
    const user = await mpCheckSession();

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}

/**
 * Destroys session on server via POST /api/logout and redirects to login.html.
 */
async function mpLogout() {
    try {
        await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
    } catch (error) {
        console.error("Logout request failed:", error);
    } finally {
        window.location.href = "login.html";
    }
}
