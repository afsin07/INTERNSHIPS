const user = mpRequireLogin();

if (user) {

    document.getElementById("userName").innerText = user.name.split(" ")[0];

    const reports = mpGetReports(user.email);

    document.getElementById("statTotal").innerText = reports.length;

    document.getElementById("statLast").innerText =
        reports.length > 0 ? formatDate(reports[0].date) : "—";

    document.getElementById("statRisk").innerText =
        reports.length > 0 ? reports[0].riskLevel : "—";

    renderReportList(reports);
}

document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    mpLogout();
    window.location.href = "login.html";
});

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

                        <span class="risk-dot ${riskClass[r.riskLevel]}"></span>

                        <div>
                            <h4>${r.topCondition}</h4>
                            <span>${formatDate(r.date)} · ${r.riskLevel} Risk · Score ${r.healthScore}/100</span>
                        </div>

                    </div>

                    <div class="report-item-actions">

                        <button class="icon-btn" title="View report" onclick="window.location.href='report.html?id=${r.id}'">
                            <i class="fa-solid fa-eye"></i>
                        </button>

                        <button class="icon-btn" title="Delete report" onclick="handleDelete('${r.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>

                    </div>

                </div>
            `).join("")}
        </div>
    `;
}

function handleDelete(id) {
    if (!confirm("Delete this report? This cannot be undone.")) return;
    mpDeleteReport(user.email, id);
    location.reload();
}
