document.addEventListener('DOMContentLoaded', () => {
    console.log('Club Ciclista App Initialized');

    const ctaButton = document.getElementById('cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
             alert('Great choice! Check our "Join Us" section for details on how to sign up.');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
