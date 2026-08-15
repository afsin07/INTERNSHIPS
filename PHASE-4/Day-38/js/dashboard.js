let user = null;

async function initDashboard() {
    user = await mpRequireLogin();

    if (user) {
        const userNameEl = document.getElementById("userName");
        if (userNameEl) {
            userNameEl.innerText = user.name ? user.name.split(" ")[0] : "User";
        }

        loadReports();
    }
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        await mpLogout();
    });
}


async function loadReports() {

    try {

        const response = await fetch("/api/reports", {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to load reports"
            );
        }

        const reports = result.reports || [];

        console.log("✅ Reports loaded from server:", reports);

        const statTotal = document.getElementById("statTotal");
        const statLast = document.getElementById("statLast");
        const statRisk = document.getElementById("statRisk");

        if (statTotal) statTotal.innerText = reports.length;

        if (statLast) {
            statLast.innerText = reports.length > 0
                ? formatDate(reports[0].date)
                : "—";
        }

        if (statRisk) {
            statRisk.innerText = reports.length > 0
                ? reports[0].riskLevel
                : "—";
        }

        renderReportList(reports);

    } catch (error) {

        console.error("❌ Failed to load reports:", error);

        const wrap = document.getElementById("reportListWrap");
        if (wrap) {
            wrap.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <p>Unable to load reports from the server.</p>
                </div>
            `;
        }
    }
}


function formatDate(iso) {

    const d = new Date(iso);

    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


function renderReportList(reports) {

    const wrap = document.getElementById("reportListWrap");
    if (!wrap) return;

    if (reports.length === 0) {

        wrap.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-file-circle-plus"></i>
                <p>You haven't taken a health assessment yet.</p>
            </div>
        `;

        return;
    }

    const riskClass = {
        Low: "risk-low",
        Medium: "risk-medium",
        High: "risk-high"
    };

    wrap.innerHTML = `
        <div class="report-list">

            ${reports.map((r) => `

                <div class="report-item">

                    <div class="report-item-left">

                        <span class="risk-dot ${riskClass[r.riskLevel] || ""}"></span>

                        <div>

                            <h4>${r.topCondition}</h4>

                            <span>
                                ${formatDate(r.date)}
                                · ${r.riskLevel} Risk
                                · Score ${r.healthScore}/100
                            </span>

                        </div>

                    </div>


                    <div class="report-item-actions">

                        <!-- VIEW -->
                        <button
                            class="icon-btn"
                            title="View report"
                            onclick="window.location.href='report.html?id=${r.id}'">

                            <i class="fa-solid fa-eye"></i>

                        </button>


                        <!-- EDIT -->
                        <button
                            class="icon-btn"
                            title="Edit report"
                            onclick="editReport('${r.id}')">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <!-- DELETE -->
                        <button
                            class="icon-btn"
                            title="Delete report"
                            onclick="handleDelete('${r.id}')">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </div>

            `).join("")}

        </div>
    `;
}


// ============================
// EDIT REPORT
// ============================

function editReport(id) {

    window.location.href =
        `health-form.html?edit=${encodeURIComponent(id)}`;
}


// ============================
// DELETE REPORT
// ============================

async function handleDelete(id) {

    if (!confirm("Delete this report? This cannot be undone.")) {
        return;
    }

    try {

        const response = await fetch(`/api/reports/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to delete report"
            );
        }

        alert("Report deleted successfully.");

        loadReports();

    } catch (error) {

        console.error("❌ DELETE failed:", error);

        alert(
            "Unable to delete the report.\n\n" +
            error.message
        );
    }
}

// Initialize Dashboard
initDashboard();