// Partners Carousel Animation with Smooth Panning
document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize panning carousel
    const initPanningCarousel = (container) => {
        const track = container.querySelector('.partners-track');
        const logos = track.querySelectorAll('.partner-logo');
        
        if (!logos.length) return;

        // Set up track for panning
        track.style.display = 'flex';
        track.style.transition = 'none';
        
        const logoWidth = logos[0].offsetWidth;
        const gap = 40;
        const totalWidth = (logoWidth + gap) * logos.length;
        
        // Double the content for seamless looping
        track.innerHTML = track.innerHTML + track.innerHTML;
        
        let position = 0;
        let animationId;
        let lastTimestamp;
        const speed = 1; // Pixels per frame
        
        const pan = (timestamp) => {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            
            position -= speed * (delta / 16); // Normalize to 60fps
            track.style.transform = `translateX(${position}px)`;
            
            // Reset position when halfway
            if (-position >= totalWidth / 2) {
                position += totalWidth / 2;
                track.style.transition = 'none';
                track.style.transform = `translateX(${position}px)`;
                // Force reflow
                void track.offsetWidth;
            }
            
            animationId = requestAnimationFrame(pan);
        };
        
        const startPanning = () => {
            if (!animationId) {
                lastTimestamp = null;
                animationId = requestAnimationFrame(pan);
            }
        };
        
        const stopPanning = () => {
            cancelAnimationFrame(animationId);
            animationId = null;
        };
        
        // Pause on hover
        container.addEventListener('mouseenter', stopPanning);
        container.addEventListener('mouseleave', startPanning);
        
        // Start panning
        startPanning();
        
        // Handle visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopPanning();
            } else {
                startPanning();
            }
        });
    };

    // Initialize all carousels except Cloud, Endpoint, and Service partners
    const allPartnerContainers = document.querySelectorAll(`
        .partners-carousel .partners-container,
        .solution-partners .partners-container
    `);

    allPartnerContainers.forEach(container => {
        // Skip Cloud (4th solution), Endpoint (5th solution), and Service (9th solution) partners
        const isStaticSection = container.closest('.solution-partners') && 
            (container.closest('.solution-item:nth-child(4)') || // Cloud
             container.closest('.solution-item:nth-child(5)') || // Endpoint
             container.closest('.solution-item:nth-child(9)'));  // Service
        
        if (!isStaticSection) {
            initPanningCarousel(container);
        }
    });

    // Setup static partners sections (Cloud, Endpoint, Service)
    const staticSections = [
        '.solution-item:nth-child(4) .solution-partners', // Cloud
        '.solution-item:nth-child(5) .solution-partners', // Endpoint
        '.solution-item:nth-child(9) .solution-partners'  // Service
    ];

    staticSections.forEach(selector => {
        const staticContainers = document.querySelectorAll(selector + ' .partners-container');
        staticContainers.forEach(container => {
            const track = container.querySelector('.partners-track');
            if (track) {
                track.style.display = 'flex';
                track.style.justifyContent = 'center';
                track.style.flexWrap = 'wrap';
                track.style.gap = '40px';
                track.style.transform = 'none';
                track.style.width = '100%';
            }
        });
    });
});