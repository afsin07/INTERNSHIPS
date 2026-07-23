const page = document.documentElement;
const navigation = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const themeToggle = document.querySelector('.theme-toggle');

page.classList.add('js');

if (menuToggle && navigation) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        menuToggle.innerHTML = `<i class="fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}"></i>`;
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navigation.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = page.dataset.theme === 'light';
        page.dataset.theme = isLight ? 'dark' : 'light';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to light theme' : 'Switch to dark theme');
        themeToggle.innerHTML = `<i class="fa-solid ${isLight ? 'fa-sun' : 'fa-moon'}"></i>`;
    });
}

const sections = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

sections.forEach((section) => revealObserver.observe(section));