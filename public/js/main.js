// main.js - 100% Working Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'navbar-overlay';
    document.body.appendChild(overlay);

    // Mobile menu toggle
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle menu and overlay
            navbar.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Change icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            });
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            navbar.classList.remove('active');
            this.classList.remove('active');
            body.classList.remove('menu-open');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    }
});

    // Add animations on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .solution-card, .feature-card, .partner-logo');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
;

// Animate services on scroll
const animateServices = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateServices);

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    animateServices();
    
    // Set initial state for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    });
});



//additional script for the index.html

// Partners Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.partners-track');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    const prevBtn = document.querySelector('.prev-partner');
    const nextBtn = document.querySelector('.next-partner');
    
    if (track && partnerLogos.length > 0) {
        const logoWidth = partnerLogos[0].offsetWidth;
        const gap = 40; // Same as your CSS gap
        let position = 0;
        const visibleLogos = Math.floor(window.innerWidth / (logoWidth + gap));
        const maxPosition = -(partnerLogos.length - visibleLogos) * (logoWidth + gap);

        function updateCarousel() {
            track.style.transform = `translateX(${position}px)`;
            
            // Disable/enable buttons based on position
            prevBtn.disabled = position >= 0;
            nextBtn.disabled = position <= maxPosition;
        }

        prevBtn.addEventListener('click', function() {
            position = Math.min(position + (logoWidth + gap) * 2, 0);
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            position = Math.max(position - (logoWidth + gap) * 2, maxPosition);
            updateCarousel();
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            const newVisibleLogos = Math.floor(window.innerWidth / (logoWidth + gap));
            if (newVisibleLogos !== visibleLogos) {
                position = 0;
                updateCarousel();
            }
        });

        // Auto-scroll every 5 seconds
        let autoScroll = setInterval(() => {
            if (position > maxPosition) {
                position -= logoWidth + gap;
                updateCarousel();
            } else {
                position = 0;
                updateCarousel();
            }
        }, 5000);

        // Pause auto-scroll on hover
        const carousel = document.querySelector('.partners-carousel');
        carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
        carousel.addEventListener('mouseleave', () => {
            autoScroll = setInterval(() => {
                if (position > maxPosition) {
                    position -= logoWidth + gap;
                    updateCarousel();
                } else {
                    position = 0;
                    updateCarousel();
                }
            }, 5000);
        });

        // Initialize
        updateCarousel();
    }
});