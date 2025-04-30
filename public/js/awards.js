// Awards Cards Expansion
document.addEventListener('DOMContentLoaded', function() {
    const awardCards = document.querySelectorAll('.award-card');
    
    awardCards.forEach(card => {
        card.addEventListener('click', function() {
            // Close all other cards first
            awardCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle the clicked card
            this.classList.toggle('active');
        });
    });
    
    // Close card when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.award-card')) {
            awardCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});