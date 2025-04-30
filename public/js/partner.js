document.addEventListener('DOMContentLoaded', function() {
    // Only keep the intersection observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.partner-description p').forEach((p, index) => {
                    p.style.animationDelay = '${index * 0.1}s';
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.partner-card').forEach(card => {
        observer.observe(card);
    });

    // Better hover handling for touch devices
    if ('ontouchstart' in window) {
        document.querySelectorAll('.partner-card').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.toggle('hover-effect');
            });
        });
    }
});