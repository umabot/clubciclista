(function () {
    'use strict';

    // ── Utility: show toast message ──
    function showToast(message) {
        var toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(function () {
            toast.classList.remove('show');
        }, 3000);
    }

    // ── Utility: check Google Translate loaded ──
    function checkScriptLoad() {
        if (typeof google === 'undefined' || typeof google.translate === 'undefined') {
            document.getElementById('error-banner').style.display = 'block';
        }
    }

    // ── Lucide Icons Initialization ──
    function initIcons() {
        // Feature cards
        var iconMap = {
            'map-pin': 'map-pin',
            'users': 'users',
            'trophy': 'trophy',
            'heart': 'heart'
        };
        document.querySelectorAll('.feature-icon[data-icon]').forEach(function (el) {
            var iconName = el.getAttribute('data-icon');
            var svg = document.createElement('i');
            svg.setAttribute('data-lucide', iconName);
            el.appendChild(svg);
        });

        // Route meta icons
        var smallIconMap = {
            'calendar': 'calendar',
            'clock': 'clock',
            'ruler': 'ruler'
        };
        document.querySelectorAll('[data-icon-small]').forEach(function (el) {
            var iconName = el.getAttribute('data-icon-small');
            var svg = document.createElement('i');
            svg.setAttribute('data-lucide', iconName);
            svg.style.width = '14px';
            svg.style.height = '14px';
            el.prepend(svg);
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // ── Hero Carousel ──
    function initHeroCarousel() {
        var slides = document.querySelectorAll('.hero-slide');
        var dotsContainer = document.getElementById('hero-dots');
        var currentIndex = 0;
        var totalSlides = slides.length;
        var autoplayTimer = null;

        // Create dots
        for (var i = 0; i < totalSlides; i++) {
            var dot = document.createElement('button');
            dot.classList.add('hero-dot');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.dataset.index = i;
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            dotsContainer.children[currentIndex].classList.remove('active');
            currentIndex = (index + totalSlides) % totalSlides;
            slides[currentIndex].classList.add('active');
            dotsContainer.children[currentIndex].classList.add('active');
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(function () {
                goToSlide(currentIndex + 1);
            }, 5000);
        }

        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
        }

        // Arrow buttons
        document.getElementById('hero-prev').addEventListener('click', function () {
            goToSlide(currentIndex - 1);
            startAutoplay();
        });
        document.getElementById('hero-next').addEventListener('click', function () {
            goToSlide(currentIndex + 1);
            startAutoplay();
        });

        // Dot buttons
        dotsContainer.addEventListener('click', function (e) {
            var dot = e.target.closest('.hero-dot');
            if (!dot) return;
            goToSlide(parseInt(dot.dataset.index, 10));
            startAutoplay();
        });

        startAutoplay();
    }

    // ── Language Switcher (Google Translate) ──
    function initLanguageSwitcher() {
        function changeLanguage(langCode) {
            document.querySelectorAll('.lang-btn').forEach(function (btn) {
                btn.classList.toggle('active', btn.dataset.lang === langCode);
            });

            var attempts = 0;
            var maxAttempts = 50;

            var poll = setInterval(function () {
                var combo = document.querySelector('.goog-te-combo');
                attempts++;

                if (combo) {
                    combo.value = langCode;
                    combo.dispatchEvent(new Event('change'));
                    localStorage.setItem('club_lang_pref', langCode);
                    clearInterval(poll);
                } else if (attempts >= maxAttempts) {
                    checkScriptLoad();
                    clearInterval(poll);
                }
            }, 100);
        }

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                changeLanguage(btn.dataset.lang);
            });
        });

        // Restore saved preference
        var saved = localStorage.getItem('club_lang_pref') || 'es';
        setTimeout(function () {
            if (saved !== 'es') {
                changeLanguage(saved);
            }
        }, 500);

        setTimeout(checkScriptLoad, 3000);
    }

    // ── Mobile Navigation Toggle ──
    function initMobileNav() {
        document.getElementById('hamburger-btn').addEventListener('click', function () {
            document.getElementById('nav-links').classList.toggle('open');
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () {
                document.getElementById('nav-links').classList.remove('open');
            });
        });
    }

    // ── Contact Form Handler ──
    function initContactForm() {
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();
            // In a real app this would POST to a backend / Google Apps Script proxy
            showToast('¡Mensaje enviado! Te responderemos pronto.');
            e.target.reset();
        });
    }

    // ── Past Routes Link ──
    function initPastRoutes() {
        document.getElementById('past-routes-link').addEventListener('click', function (e) {
            e.preventDefault();
            showToast('Sección de rutas anteriores — próximamente.');
        });
    }

    // ── Boot ──
    document.addEventListener('DOMContentLoaded', function () {
        initIcons();
        initHeroCarousel();
        initLanguageSwitcher();
        initMobileNav();
        initContactForm();
        initPastRoutes();
    });
})();
