// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');

function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

if (mobileMenuBtn && mobileMenu) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (closeMenu && mobileMenu) closeMenu.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu || !mobileMenuBtn) return;
    if (mobileMenu.classList.contains('open')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.startsWith('#/')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        }
    });
});

// Active nav link based on current page
const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length) {
    const currentPath = window.location.pathname.split('/').filter(Boolean);
    const currentPage = currentPath.length ? currentPath[currentPath.length - 1] : 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const hrefParts = href.split('/');
        const hrefPage = hrefParts[hrefParts.length - 1] || 'index.html';

        if (hrefPage === currentPage) {
            link.classList.add('active');
        } else if (!href.includes('.') && (currentPage === 'index.html' || currentPage === '')) {
            if (href === '#' || href === '') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !phone || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert('Thank you for your message. We will contact you shortly.');
        this.reset();
    });
}

// Careers application form submission

const careersForm = document.getElementById('careers-application-form');
if (careersForm) {
    careersForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('career-name');
        const emailInput = document.getElementById('career-email');
        const phoneInput = document.getElementById('career-phone');
        const positionInput = document.getElementById('career-position');
        const messageInput = document.getElementById('career-message');
        const cvInput = document.getElementById('career-cv');
        const statusElement = document.getElementById('career-message-status');

        if (!nameInput || !emailInput || !phoneInput || !messageInput || !cvInput || !statusElement) {
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const position = positionInput ? positionInput.value.trim() : '';
        const message = messageInput.value.trim();
        const cvFile = cvInput.files[0];

        if (!name || !email || !phone || !message || !cvFile) {
            statusElement.style.color = '#b91c1c';
            statusElement.textContent = 'Please complete all required fields and upload your CV.';
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            statusElement.style.color = '#b91c1c';
            statusElement.textContent = 'Please enter a valid email address.';
            return;
        }

        statusElement.style.color = '#0f172a';
        statusElement.textContent = 'Submitting your application...';

        const formData = new FormData();
        formData.append('fullname', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('position', position);
        formData.append('message', message);
        formData.append('cv', cvFile);

        try {
            const response = await fetch('apply.php', {
                method: 'POST',
                body: formData
            });

            .then(response => response.text())
            .then(data => console.log("Server response:", data))
            .catch(error => console.error("Fetch error:", error));


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }

            statusElement.style.color = '#15803d';
            statusElement.textContent = 'Thank you. Your application has been submitted successfully.';
            careersForm.reset();
        } catch (error) {
            console.error(error);
            statusElement.style.color = '#b91c1c';
            statusElement.textContent = 'There was a problem submitting your application. Please try again later.';
        }
    });
}

// Accordion functionality for practice areas
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content) content.classList.toggle('active');
    });
});

const animatedSelectors = [
    '.section-header',
    '.service-card',
    '.feature-card',
    '.about-preview',
    '.stats-content',
    '.cta-content'
];

if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll(animatedSelectors.join(','));

    if (animatedElements.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        animatedElements.forEach(element => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    }
}

// Current year in footer
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    const year = new Date().getFullYear();
    copyrightElement.innerHTML = `&copy; ${year} Nzuza Attorneys. All rights reserved. Developed by <a href="https://smangalisoholdings.com" target="_blank" rel="noopener">Smangaliso Holdings</a>.`;
}
