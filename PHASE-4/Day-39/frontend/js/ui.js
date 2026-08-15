// MediPredict UI animation helpers
// Adds reveal-on-scroll effects, header scroll state,
// and hero floating interactions.

const mpUiObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                if (entry.target.dataset.once === "true") {
                    mpUiObserver.unobserve(entry.target);
                }
            }
        });
    },
    {
        threshold: 0.18,
    }
);

function mpInitUiAnimations() {
    const revealTargets = [
        "section",
        ".hero-left",
        ".hero-right",
        ".feature-card",
        ".dash-stat-card",
        ".report-item",
        ".form-card",
        ".auth-card",
        ".register-card",
        ".testimonial-card",
        ".step-card",
        ".faq-item",
        ".contact-card",
        ".register-benefits div",
        ".dash-header",
        ".report-print-card",
        ".disclaimer",
        ".stats",
        ".hero-buttons",
        ".hero-placeholder",
        ".about-placeholder",
    ];

    const nodes = revealTargets
        .flatMap((selector) => Array.from(document.querySelectorAll(selector)));

    nodes.forEach((node) => {
        node.classList.add("animated-section");
        mpUiObserver.observe(node);
    });

    const header = document.querySelector("header");
    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 20) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    const heroArea = document.querySelector(".hero");
    if (heroArea) {
        const floatingCards = heroArea.querySelectorAll(".floating-card");

        heroArea.addEventListener("mousemove", (event) => {
            const rect = heroArea.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            floatingCards.forEach((card, index) => {
                const multiplier = 12 + index * 4;
                card.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
            });
        });

        heroArea.addEventListener("mouseleave", () => {
            floatingCards.forEach((card) => {
                card.style.transform = "";
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", mpInitUiAnimations);
