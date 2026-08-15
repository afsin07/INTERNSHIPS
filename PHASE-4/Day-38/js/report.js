let reportUser = null;

async function initReportPage() {
    reportUser = await mpRequireLogin();
    if (!reportUser) return;

    await loadReport();
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        await mpLogout();
    });
}

async function loadReport() {

    if (!reportUser) return;

    const params = new URLSearchParams(window.location.search);
    const reportId = params.get("id");

    const shell = document.getElementById("reportShell");

    if (!reportId) {
        showNotFound(shell);
        return;
    }

    try {

        // READ ONE REPORT FROM MYSQL
        const response = await fetch(
            `/api/reports/${reportId}`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Report not found");
        }

        console.log("✅ Report loaded from MySQL:", result);

        renderReport(result.report);

    } catch (error) {

        console.error("❌ Failed to load report:", error);

        showNotFound(shell);
    }
}


function showNotFound(shell) {

    if (!shell) return;

    shell.innerHTML = `
        <div class="empty-state">
            <i class="fa-solid fa-file-circle-question"></i>
            <p>We couldn't find that report.</p>
            <br>
            <a href="dashboard.html" class="btn btn-primary">
                Back to Dashboard
            </a>
        </div>
    `;
}


function riskClass(level) {
    return {
        Low: "risk-low",
        Medium: "risk-medium",
        High: "risk-high"
    }[level] || "risk-low";
}


function formatDate(iso) {

    const d = new Date(iso);

    return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


function renderReport(r) {

    const shell = document.getElementById("reportShell");
    if (!shell) return;

    const rClass = riskClass(r.riskLevel);

    const conditions = Array.isArray(r.conditions)
        ? r.conditions
        : [];

    const recommendations = Array.isArray(r.recommendations)
        ? r.recommendations
        : [];


    const conditionsHtml = conditions.length > 0

        ? conditions.map((c) => `
            <div class="condition-bar-row">

                <div class="condition-bar-label">
                    <span>${c.name}</span>
                    <span>${c.percent}%</span>
                </div>

                <div class="condition-bar-track">
                    <div
                        class="condition-bar-fill"
                        style="width:${c.percent}%">
                    </div>
                </div>

            </div>
        `).join("")

        : `
            <p style="color:#666;font-size:14px;">
                No specific condition patterns were flagged from your answers.
            </p>
        `;


    const recsHtml = recommendations.map((rec) => `
        <div>
            <i class="fa-solid fa-circle-check"></i>
            ${rec}
        </div>
    `).join("");


    shell.innerHTML = `

        <div class="report-print-card">

            <div class="report-top">

                <div class="logo">
                    <i class="fa-solid fa-heart-pulse"></i>
                    <h2>Medi<span>Predict</span></h2>
                </div>

                <div class="report-meta">
                    <div>
                        <strong>${reportUser.name || 'User'}</strong>
                    </div>

                    <div>
                        ${formatDate(r.date)}
                    </div>
                </div>

            </div>


            <div class="risk-banner ${rClass}">

                <div class="risk-score">
                    ${r.healthScore}
                </div>

                <div>

                    <h3>
                        ${r.riskLevel} Risk — ${r.topCondition}
                    </h3>

                    <p>
                        Overall lifestyle health score out of 100.
                        Higher is better.
                    </p>

                </div>

            </div>


            <div class="report-block">

                <h4>
                    <i class="fa-solid fa-chart-simple"></i>
                    Flagged Condition Patterns
                </h4>

                ${conditionsHtml}

            </div>


            <div class="report-block">

                <h4>
                    <i class="fa-solid fa-lightbulb"></i>
                    Recommendations
                </h4>

                <div class="rec-list">
                    ${recsHtml}
                </div>

            </div>


            <div class="report-footer-note">

                This report was generated automatically from
                self-reported answers using simple rule-based
                logic in your browser. It is not a medical diagnosis
                and is not reviewed by a healthcare professional.
                Please consult a doctor for any health concerns.

            </div>

        </div>


        <div class="report-actions">

            <button
                class="btn btn-outline"
                onclick="window.print()">

                <i class="fa-solid fa-download"></i>
                Download / Print

            </button>


            <a
                href="dashboard.html"
                class="btn btn-primary">

                <i class="fa-solid fa-gauge"></i>
                Back to Dashboard

            </a>

        </div>

    `;
}


// Load the report page
initReportPage();