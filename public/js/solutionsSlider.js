// Solutions Scroll Animation with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const solutionItems = document.querySelectorAll('.solution-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    solutionItems.forEach(item => {
        observer.observe(item);
    });
});