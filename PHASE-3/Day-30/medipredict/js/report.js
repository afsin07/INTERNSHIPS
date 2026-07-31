const reportUser = mpRequireLogin();

document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    mpLogout();
    window.location.href = "login.html";
});

if (reportUser) {

    const params = new URLSearchParams(window.location.search);
    const reportId = params.get("id");

    const report = reportId ? mpGetReportById(reportUser.email, reportId) : null;

    const shell = document.getElementById("reportShell");

    if (!report) {

        shell.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-file-circle-question"></i>
                <p>We couldn't find that report.</p>
                <br>
                <a href="dashboard.html" class="btn btn-primary">Back to Dashboard</a>
            </div>
        `;

    } else {

        renderReport(report);

    }
}

function riskClass(level) {
    return { Low: "risk-low", Medium: "risk-medium", High: "risk-high" }[level];
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
    const rClass = riskClass(r.riskLevel);

    const conditionsHtml = r.conditions.length > 0
        ? r.conditions.map((c) => `
            <div class="condition-bar-row">
                <div class="condition-bar-label">
                    <span>${c.name}</span>
                    <span>${c.percent}%</span>
                </div>
                <div class="condition-bar-track">
                    <div class="condition-bar-fill" style="width:${c.percent}%"></div>
                </div>
            </div>
        `).join("")
        : `<p style="color:#666;font-size:14px;">No specific condition patterns were flagged from your answers.</p>`;

    const recsHtml = r.recommendations.map((rec) => `
        <div><i class="fa-solid fa-circle-check"></i> ${rec}</div>
    `).join("");

    shell.innerHTML = `

        <div class="report-print-card">

            <div class="report-top">

                <div class="logo">
                    <i class="fa-solid fa-heart-pulse"></i>
                    <h2>Medi<span>Predict</span></h2>
                </div>

                <div class="report-meta">
                    <div><strong>${reportUser.name}</strong></div>
                    <div>${formatDate(r.date)}</div>
                </div>

            </div>

            <div class="risk-banner ${rClass}">

                <div class="risk-score">${r.healthScore}</div>

                <div>
                    <h3>${r.riskLevel} Risk — ${r.topCondition}</h3>
                    <p>Overall lifestyle health score out of 100. Higher is better.</p>
                </div>

            </div>

            <div class="report-block">
                <h4><i class="fa-solid fa-chart-simple"></i> Flagged Condition Patterns</h4>
                ${conditionsHtml}
            </div>

            <div class="report-block">
                <h4><i class="fa-solid fa-lightbulb"></i> Recommendations</h4>
                <div class="rec-list">
                    ${recsHtml}
                </div>
            </div>

            <div class="report-footer-note">
                This report was generated automatically from self-reported answers using
                simple rule-based logic in your browser. It is not a medical diagnosis and
                is not reviewed by a healthcare professional. Please consult a doctor for
                any health concerns.
            </div>

        </div>

        <div class="report-actions">

            <button class="btn btn-outline" onclick="window.print()">
                <i class="fa-solid fa-download"></i> Download / Print
            </button>

            <a href="dashboard.html" class="btn btn-primary">
                <i class="fa-solid fa-gauge"></i> Back to Dashboard
            </a>

        </div>
    `;
}
