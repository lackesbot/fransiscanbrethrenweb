// ST. MICHAEL'S WEBSITE ENHANCEMENT SCRIPT

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebsiteEnhancements);
} else {
    initWebsiteEnhancements();
}

// Add js-enabled class to HTML element
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js-enabled');

// Main initialization function
function initWebsiteEnhancements() {
    initializeAccessibilityFeatures();
    initializeNavigation();
    initializeContactForm();
    initializeAnalytics();

    console.log('St. Michael\'s Website Enhancement Script Loaded');
}

// ACCESSIBILITY ENHANCEMENTS

// Accessibility features initialization
function initializeAccessibilityFeatures() {
    createSkipLink();
    setupFocusManagement();
    enhanceSemantics();

    console.log('Accessibility features initialized');
}

// Create skip link for accessibility
function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip to main content');

    document.body.insertBefore(skipLink, document.body.firstChild);

    skipLink.addEventListener('focus', function () {
        this.classList.remove('sr-only');
    });

    skipLink.addEventListener('blur', function () {
        this.classList.add('sr-only');
    });
}

// Focus management for keyboard navigation
function setupFocusManagement() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Enhance semantic structure
function enhanceSemantics() {
    const main = document.querySelector('main');
    if (main && !main.getAttribute('role')) {
        main.setAttribute('role', 'main');
    }

    const header = document.querySelector('header');
    if (header && !header.getAttribute('role')) {
        header.setAttribute('role', 'banner');
    }

    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
    }
}

// NAVIGATION ENHANCEMENTS

// Navigation enhancements initialization
function initializeNavigation() {
    highlightCurrentPage();
    setupMobileMenu();

    console.log('Navigation enhancements initialized');
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('current-page');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const navContainer = document.querySelector('.button-container');
    if (!navContainer) return;

    let menuToggle = document.querySelector('.mobile-menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;

        navContainer.parentNode.insertBefore(menuToggle, navContainer);
    }

    console.log('Mobile menu toggle created:', menuToggle);

    menuToggle.addEventListener('click', function () {
        const isOpen = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isOpen);
        this.classList.toggle('active');
        navContainer.classList.toggle('mobile-open');
        console.log('Menu toggled, open:', !isOpen);
    });

    document.addEventListener('click', function (e) {
        if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            navContainer.classList.remove('mobile-open');
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 480) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            navContainer.classList.remove('mobile-open');
        }
    });
}

// CONTACT FORM ENHANCEMENTS

// Contact form enhancements initialization
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    setupFormValidation(contactForm);
    setupFormAccessibility(contactForm);

    console.log('Contact form enhancements initialized');
}

// Form validation setup
function setupFormValidation(form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const errorElement = document.getElementById(field.name + '-error');

            if (!field.value.trim()) {
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'This field is required.';
                    errorElement.style.display = 'block';
                }
                isValid = false;
            } else {
                field.classList.remove('error');
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            }

            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    field.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Please enter a valid email address.';
                        errorElement.style.display = 'block';
                    }
                    isValid = false;
                }
            }
        });

        if (isValid) {
            submitForm(form);
        }
    });

    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', function () {
            validateField(this);
        });
    });
}

// Validate individual field
function validateField(field) {
    const errorElement = document.getElementById(field.name + '-error');

    if (field.hasAttribute('required') && !field.value.trim()) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = 'This field is required.';
            errorElement.style.display = 'block';
        }
    } else if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Please enter a valid email address.';
                errorElement.style.display = 'block';
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        }
    } else {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
}

// Submit form function
function submitForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const data = {
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    setTimeout(() => {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div style="
                background: #d4edda;
                color: #155724;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #c3e6cb;
                margin: 20px 0;
                text-align: center;
                font-weight: 500;
            ">
                <strong>✅ Message Sent Successfully!</strong><br>
                Thank you for contacting us, ${data.firstname}. We will respond within 24 hours.
            </div>
        `;

        form.parentNode.insertBefore(successMessage, form);

        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 5000);

        // In production, integrate with EmailJS or similar service:
        // emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data)
        //     .then(() => {
        //         // Success
        //     }, (error) => {
        //         // Error handling
        //     });
    }, 1500);
}

// Form accessibility setup
function setupFormAccessibility(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach((field, index) => {
        if (!field.hasAttribute('aria-label') && !field.hasAttribute('aria-labelledby')) {
            const label = form.querySelector(`label[for="${field.id}"]`);
            if (label) {
                field.setAttribute('aria-labelledby', label.id);
            }
        }

        field.setAttribute('aria-describedby', field.name + '-error');
    });
}

// ANALYTICS AND TRACKING

// Analytics initialization
function initializeAnalytics() {
    trackButtonClicks();
    trackFormSubmissions();

    console.log('Analytics tracking initialized');
}

// Track important button clicks
function trackButtonClicks() {
    const trackableButtons = document.querySelectorAll('.cta-btn, .cta-btn2, .nav-link');
    trackableButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href') || this.getAttribute('data-href');

            console.log('Button clicked:', buttonText, buttonHref);
        });
    });
}

// Track form submissions
function trackFormSubmissions() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function () {
            console.log('Form submitted:', form.className);
        });
    });
}

// UTILITY FUNCTIONS

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// PERFORMANCE MONITORING

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function () {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// ERROR HANDLING

// Global error handling
window.addEventListener('error', function (event) {
    console.error('JavaScript error:', event.error);
});

// Console message for development
console.log('St. Michael\'s Website Enhancement Script v2.0 Loaded');

