// Company Page Slider
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    const slides = document.querySelectorAll('.company-slider .slide');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide

    function initSlider() {
        slides.forEach((slide, index) => {
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
            slide.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)';
        });
        
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '1';
    }

    function nextSlide() {
        // Fade out current slide
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.zIndex = '0';
        
        // Update current slide index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Fade in new slide
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '1';
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function pauseSlider() {
        clearInterval(slideInterval);
    }

    // Pause on hover
    const slider = document.querySelector('.company-slider');
    if (slider) {
        slider.addEventListener('mouseenter', pauseSlider);
        slider.addEventListener('mouseleave', startSlider);
    }

    // Initialize
    initSlider();
    startSlider();

    // Animate content card when in view
    const contentCard = document.querySelector('.content-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (contentCard) {
        observer.observe(contentCard);
    }
});