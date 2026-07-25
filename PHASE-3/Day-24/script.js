const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const navigationLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('.section, .project-card, .card');
const skillButtons = document.querySelectorAll('.skill[type="button"]');

if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        menuToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    navigationLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navigation.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        navigationLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
    item.classList.add('reveal');
    revealObserver.observe(item);
});

skillButtons.forEach((skill) => {
    skill.addEventListener('click', () => {
        skillButtons.forEach((button) => button.classList.remove('selected'));
        skill.classList.add('selected');
    });
});

const assessmentForm = document.querySelector('#assessment-form');
const riskPreview = document.querySelector('#risk-preview');

if (assessmentForm && riskPreview) {
    assessmentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        riskPreview.innerHTML = '<span class="overline">Your snapshot is ready</span><h2>Good foundation, room to grow.</h2><p>Your answers suggest a steady baseline. Focus on consistent sleep and daily movement as your next two supportive habits.</p><div class="score-status"><span class="status-dot"></span> Low immediate concern <span class="score-change">76 / 100</span></div><a class="button button-primary" href="insights.html" style="margin-top:24px">View my insights <i class="fa-solid fa-arrow-right"></i></a>';
    });
}
