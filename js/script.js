(function () {
    'use strict';

    // ── DATA: Members ──
    var members = [
        { name: "Carlos Martínez", role: "Presidente", initials: "CM" },
        { name: "Laura Rodríguez", role: "Vicepresidenta", initials: "LR" },
        { name: "Pablo García", role: "Coordinador de Rutas", initials: "PG" },
        { name: "Ana Fernández", role: "Tesorera", initials: "AF" },
        { name: "Miguel Sánchez", role: "Comunicación", initials: "MS" },
        { name: "Elena López", role: "Mecánica del Club", initials: "EL" }
    ];

    // ── DATA: Routes ──
    var routes = [
        {
            title: "Sierra Norte Explorer",
            date: "22 Mar 2026",
            time: "08:00",
            distance: "72 km",
            desc: "Ascenso por Puerto de Canencia con vistas espectaculares. Dificultad media-alta.",
            bgClass: "placeholder-bg-1"
        },
        {
            title: "Vía Verde del Tajuña",
            date: "29 Mar 2026",
            time: "09:00",
            distance: "45 km",
            desc: "Ruta familiar y accesible por la antigua vía del tren. Ideal para principiantes.",
            bgClass: "placeholder-bg-2"
        },
        {
            title: "Navacerrada Challenge",
            date: "05 Abr 2026",
            time: "07:30",
            distance: "95 km",
            desc: "Reto de ascenso al Puerto de Navacerrada. Solo para ciclistas experimentados.",
            bgClass: "placeholder-bg-3"
        },
        {
            title: "Aranjuez Real",
            date: "12 Abr 2026",
            time: "08:30",
            distance: "60 km",
            desc: "Recorrido llano junto al Tajo, pasando por los Jardines del Príncipe.",
            bgClass: "placeholder-bg-4"
        }
    ];

    // ── Utility: show toast message ──
    function showToast(message) {
        var toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(function () {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // ── Utility: check Google Translate loaded ──
    function checkScriptLoad() {
        if (typeof google === 'undefined' || typeof google.translate === 'undefined') {
            var banner = document.getElementById('error-banner');
            if (banner) banner.style.display = 'block';
        }
    }

    // ── RENDER: Members ──
    function renderMembers() {
        var grid = document.getElementById('members-grid');
        if (!grid) return;
        
        grid.innerHTML = ''; // Clear existing
        members.forEach(function(m) {
            var card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = 
                '<div class="member-avatar">' + m.initials + '</div>' +
                '<h3>' + m.name + '</h3>' +
                '<p class="member-role">' + m.role + '</p>';
            grid.appendChild(card);
        });
    }

    // ── RENDER: Routes ──
    function renderRoutes() {
        var track = document.getElementById('routes-track');
        if (!track) return;

        track.innerHTML = ''; // Clear existing
        routes.forEach(function(r) {
            var card = document.createElement('div');
            card.className = 'route-card';
            card.innerHTML = 
                '<div class="route-img ' + r.bgClass + '" role="img" aria-label="' + r.title + '"></div>' +
                '<div class="route-info">' +
                    '<h3>' + r.title + '</h3>' +
                    '<div class="route-meta">' +
                        '<span data-icon-small="calendar">' + r.date + '</span>' +
                        '<span data-icon-small="clock">' + r.time + '</span>' +
                        '<span data-icon-small="ruler">' + r.distance + '</span>' +
                    '</div>' +
                    '<p>' + r.desc + '</p>' +
                '</div>';
            track.appendChild(card);
        });
    }

    // ── Lucide Icons Initialization ──
    function initIcons() {
        // Feature cards
        document.querySelectorAll('.feature-icon[data-icon]').forEach(function (el) {
            var iconName = el.getAttribute('data-icon');
            if (iconName && !el.querySelector('svg')) {
                 var svg = document.createElement('i');
                 svg.setAttribute('data-lucide', iconName);
                 el.appendChild(svg);
            }
        });

        // Route meta icons - need to run after renderRoutes
        document.querySelectorAll('[data-icon-small]').forEach(function (el) {
            var iconName = el.getAttribute('data-icon-small');
            if (iconName && !el.querySelector('svg')) {
                var svg = document.createElement('i');
                svg.setAttribute('data-lucide', iconName);
                svg.style.width = '14px';
                svg.style.height = '14px';
                el.prepend(svg);
            }
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // ── Hero Carousel ──
    function initHeroCarousel() {
        var slides = document.querySelectorAll('.hero-slide');
        var dotsContainer = document.getElementById('hero-dots');
        
        if (!slides.length || !dotsContainer) return;

        var currentIndex = 0;
        var totalSlides = slides.length;
        var autoplayTimer = null;

        // Clear existing dots
        dotsContainer.innerHTML = '';

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
        var prevBtn = document.getElementById('hero-prev');
        var nextBtn = document.getElementById('hero-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                goToSlide(currentIndex - 1);
                startAutoplay();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                goToSlide(currentIndex + 1);
                startAutoplay();
            });
        }

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
        var btn = document.getElementById('hamburger-btn');
        var linksContainer = document.getElementById('nav-links');

        if (!btn || !linksContainer) return;

        btn.addEventListener('click', function () {
            linksContainer.classList.toggle('open');
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () {
                linksContainer.classList.remove('open');
            });
        });
    }

    // ── Contact Form Handler ──
    function initContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;

        // Add clear button listener if it exists (optional enhancement for future)
        // ...

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            var formData = new FormData(form);
            var data = {};
            // Using Array.from for compatibility or simple iteration
            // But formData.forEach is widely supported in modern browsers
            data.name = formData.get('name');
            data.email = formData.get('email');
            data.message = formData.get('message');
            data.timestamp = new Date().toISOString();

            // Save to localStorage
            try {
                var messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
                messages.push(data);
                localStorage.setItem('contact_messages', JSON.stringify(messages));
                console.log('Message saved to localStorage:', data);
            } catch (err) {
                console.error('Error saving to localStorage:', err);
            }

            // Show success feedback
            showToast('¡Mensaje enviado! Gracias por contactarnos.');
            form.reset();
        });
    }

    // ── Past Routes Link ──
    function initPastRoutes() {
        var link = document.getElementById('past-routes-link');
        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showToast('Sección de rutas anteriores — próximamente.');
            });
        }
    }

    // ── Boot ──
    document.addEventListener('DOMContentLoaded', function () {
        renderMembers();
        renderRoutes();
        initIcons(); // Must run AFTER render functions to catch new icons
        initHeroCarousel();
        initLanguageSwitcher();
        initMobileNav();
        initContactForm();
        initPastRoutes();
    });
})();
