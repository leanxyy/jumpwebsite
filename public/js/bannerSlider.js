// Banner Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const slideContent = document.querySelectorAll('.slide-content');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide

    // Initialize the slider
    function initSlider() {
        slides.forEach((slide, index) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
            slide.style.transition = 'opacity 1s ease';
        });
        
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '1';
        updateDots();
    }

    // Show next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Show previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Go to specific slide
    function goToSlide(n) {
        // Fade out current slide
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.zIndex = '0';
        dots[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Fade in new slide
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '1';
        dots[currentSlide].classList.add('active');
        
        // Reset animation for slide content
        slideContent.forEach(content => {
            content.style.transform = 'translateY(20px)';
        });
        setTimeout(() => {
            slideContent[currentSlide].style.transform = 'translateY(0)';
        }, 50);
    }

    // Update dot indicators
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Start auto sliding
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Pause auto sliding
    function pauseSlider() {
        clearInterval(slideInterval);
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        pauseSlider();
        nextSlide();
        startSlider();
    });

    prevBtn.addEventListener('click', () => {
        pauseSlider();
        prevSlide();
        startSlider();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                pauseSlider();
                goToSlide(index);
                startSlider();
            }
        });
    });

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', pauseSlider);
    slider.addEventListener('mouseleave', startSlider);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseSlider();
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlider();
    }, {passive: true});

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) { // Swipe left
            nextSlide();
        } else if (difference < -50) { // Swipe right
            prevSlide();
        }
    }

    // Initialize
    initSlider();
    startSlider();
});