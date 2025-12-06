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