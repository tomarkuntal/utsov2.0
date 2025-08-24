// Modern Utsov Website JavaScript - Clean & Minimal
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add loading animation
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Smooth hover effects for cards
    const cards = document.querySelectorAll('.festive-card, .sponsor-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Countdown timer (if needed)
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const eventDate = new Date('October 4, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div class="countdown-display">
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<div class="countdown-display"><h3>Event is here!</h3></div>';
        }
    }

    // Update countdown every second
    if (document.getElementById('countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Add CSS for countdown display
    const countdownStyles = `
        <style>
            .countdown-display {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin: 1rem 0;
                flex-wrap: wrap;
            }
            .countdown-item {
                background: rgba(255,255,255,0.1);
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                min-width: 80px;
                backdrop-filter: blur(10px);
            }
            .countdown-number {
                display: block;
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--accent-color);
            }
            .countdown-label {
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                opacity: 0.8;
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', countdownStyles);

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Form validation (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Add error styles for form validation
    const formStyles = `
        <style>
            .form-control.error {
                border-color: #dc3545;
                box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', formStyles);

    // Mobile menu toggle enhancement
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggle && navbarCollapse) {
        navbarToggle.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggle.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Add mobile menu styles
    const mobileStyles = `
        <style>
            @media (max-width: 768px) {
                .navbar-collapse {
                    display: none;
                }
                .navbar-collapse.show {
                    display: block;
                }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', mobileStyles);

    // Artist Slideshow
    initArtistSlideshow();

    console.log('Modern Utsov website loaded successfully!');
});

// Artist Slideshow Function
function initArtistSlideshow() {
    const slideshow = document.querySelector('.artist-slideshow');
    if (!slideshow) {
        console.log('Slideshow not found');
        return;
    }
    
    const slides = slideshow.querySelectorAll('.artist-slide');
    console.log('Found', slides.length, 'slides');
    
    if (slides.length < 2) {
        console.log('Not enough slides for slideshow');
        return;
    }
    
    let currentSlide = 0;
    
    function nextSlide() {
        console.log('Changing from slide', currentSlide, 'to', (currentSlide + 1) % slides.length);
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        
        // Add visual indicator for debugging
        slideshow.setAttribute('data-current-slide', currentSlide);
    }
    
    // Initialize: hide all slides first
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.zIndex = '0';
    });
    
    // Show first slide
    slides[0].classList.add('active');
    slides[0].style.zIndex = '1';
    
    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
    
    console.log('Slideshow initialized with', slides.length, 'slides');
    
    // Add manual controls for testing
    slideshow.addEventListener('click', function() {
        nextSlide();
    });
} 