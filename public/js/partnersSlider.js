// Partners Slider
document.addEventListener('DOMContentLoaded', function() {
    const partnersContainer = document.querySelector('.partners-grid');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    let currentIndex = 0;
    const partnerCount = partnerLogos.length;
    let slideInterval;

    function showPartners() {
        partnerLogos.forEach((logo, index) => {
            logo.style.display = 'none';
            if (index >= currentIndex && index < currentIndex + 3) {
                logo.style.display = 'block';
            }
        });
    }

    function nextPartners() {
        currentIndex = (currentIndex + 1) % (partnerCount - 2);
        showPartners();
    }

    function startPartnerSlider() {
        slideInterval = setInterval(nextPartners, 3000);
    }

    function stopPartnerSlider() {
        clearInterval(slideInterval);
    }

    // Pause on hover
    partnersContainer.addEventListener('mouseenter', stopPartnerSlider);
    partnersContainer.addEventListener('mouseleave', startPartnerSlider);

    // Initialize
    showPartners();
    startPartnerSlider();
});