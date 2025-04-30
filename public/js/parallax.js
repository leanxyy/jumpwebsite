// Parallax Effect for Company Page
document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.querySelector('.company-intro-section');
    const parallaxBg = document.querySelector('.intro-parallax-bg');
    const introCard = document.querySelector('.intro-card');

    if (introSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const sectionOffset = introSection.offsetTop;
            const sectionHeight = introSection.offsetHeight;
            
            // Only apply parallax when section is in view and on larger screens
            if (window.innerWidth > 768 && 
                scrollPosition > sectionOffset - window.innerHeight && 
                scrollPosition < sectionOffset + sectionHeight) {
                
                const scrollPercent = (scrollPosition - sectionOffset) / sectionHeight;
                const parallaxSpeed = 0.3;
                
                // Background parallax effect
                parallaxBg.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
                
                // Card subtle lift effect
                if (introCard) {
                    const cardLift = Math.min(scrollPercent * 40, 20);
                    introCard.style.transform = `translateY(${cardLift}px)`;
                    introCard.style.boxShadow = `0 ${15 + cardLift/2}px ${40 + cardLift}px rgba(0, 0, 0, ${0.1 + scrollPercent*0.1})`;
                }
            }
        });
    }
});