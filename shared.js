// shared.js

// Load shared navbar and attach behaviors
(function() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            placeholder.innerHTML = html;

            // Mark the current page's nav link as active
            const page = document.body.dataset.page;
            if (page) {
                const link = document.querySelector('.navbar-nav .nav-link[data-page="' + page + '"]');
                if (link) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                }
            }

            // Get the collapse element (now that it's loaded)
            const navbarCollapse = document.querySelector('.navbar-collapse');

            // Close on nav link click (for mobile)
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navbarCollapse).hide();
                    }
                });
            });

            // Close on click/tap outside (for mobile/touchscreens)
            document.addEventListener('click', function(event) {
                const toggler = document.querySelector('.navbar-toggler');
                if (navbarCollapse.classList.contains('show') && 
                    !toggler.contains(event.target) && 
                    !navbarCollapse.contains(event.target)) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            });

            // Close on scroll/swipe (for mobile/touchscreens)
            document.addEventListener('scroll', function() {
                if (navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            });
        })
        .catch(err => {
            console.error('Failed to load navbar:', err);
        });
})();
// Intercept Formspree submissions and redirect to /thank-you/
(function() {
    const forms = document.querySelectorAll('form[action="https://formspree.io/f/xkgdzyjz"]');
    if (!forms.length) return;

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // stop default navigation to Formspree's page

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // On success, send user to your custom thank-you page
                    window.location.href = '/thank-you/';
                } else {
                    alert('There was a problem sending your message. Please email cases@interpreteraudit.com.');
                }
            })
            .catch(() => {
                alert('There was a network error. Please email cases@interpreteraudit.com.');
            });
        });
    });
})();