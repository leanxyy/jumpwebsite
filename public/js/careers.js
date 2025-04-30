document.addEventListener('DOMContentLoaded', function() {
    // Job category filtering
    const categories = document.querySelectorAll('.job-categories .category');
    const jobCards = document.querySelectorAll('.job-landscape-card');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            categories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const categoryFilter = this.dataset.category;
            
            jobCards.forEach(card => {
                card.style.display = (categoryFilter === 'all' || card.dataset.category === categoryFilter) 
                    ? 'flex' : 'none';
            });
        });
    });
    
    // Modal functionality
    const applyBtns = document.querySelectorAll('.apply-btn');
    const applicationModal = document.getElementById('applicationModal');
    const successModal = document.getElementById('successModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const closeSuccessModalBtn = document.querySelector('.close-success-modal');
    const jobPositionField = document.getElementById('jobPosition');
    const applicationForm = document.getElementById('applicationForm');
    
    function toggleModal(modal, show) {
        modal.style.display = show ? 'block' : 'none';
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }
    
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobCard = this.closest('.job-landscape-card');
            jobPositionField.value = jobCard.querySelector('h3').textContent;
            toggleModal(applicationModal, true);
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleModal(applicationModal, false);
            toggleModal(successModal, false);
        });
    });
    
    closeSuccessModalBtn.addEventListener('click', function() {
        toggleModal(successModal, false);
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === applicationModal || event.target === successModal) {
            toggleModal(event.target, false);
        }
    });
    
    // PDF download tracking
    document.querySelectorAll('.secure-pdf-download').forEach(link => {
        link.addEventListener('click', function() {
            const filename = this.dataset.filename;
            console.log(`Downloaded: ${filename}`);
            // Add analytics tracking here if needed
        });
    });
    
    // Form validation and submission
    applicationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // UI Elements
        const submitBtn = this.querySelector('button[type="submit"]');
        const submitText = submitBtn.querySelector('.submit-text');
        const loadingIcon = submitBtn.querySelector('.loading-icon');
        
        // Show loading state
        submitText.style.display = 'none';
        loadingIcon.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Validate files
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit
        const files = {
            resume: document.getElementById('resume').files[0],
            appForm: document.getElementById('applicationFormFile').files[0],
            privacyForm: document.getElementById('privacyForm').files[0]
        };
        
        // Validation checks
        try {
            for (const [name, file] of Object.entries(files)) {
                if (!file) throw new Error(`Please upload ${name.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                if (file.type !== 'application/pdf') throw new Error('Only PDF files are accepted');
                if (file.size > MAX_SIZE) throw new Error('File size exceeds 5MB limit');
            }
            
            // Create FormData
            const formData = new FormData();
            formData.append('name', document.getElementById('name').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('phone', document.getElementById('phone').value);
            formData.append('jobPosition', document.getElementById('jobPosition').value);
            formData.append('message', document.getElementById('message').value);
            formData.append('resume', files.resume);
            formData.append('applicationFormFile', files.appForm);
            formData.append('privacyForm', files.privacyForm);
            
            // Submit form
            const response = await fetch('/careers/apply', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Submission failed');
            }
            
            const data = await response.json();
            if (data.success) {
                toggleModal(applicationModal, false);
                applicationForm.reset();
                toggleModal(successModal, true);
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            submitText.style.display = 'inline-block';
            loadingIcon.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // Animate job cards on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.job-landscape-card');
        const screenPosition = window.innerHeight / 1.2;
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < screenPosition) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }
    
    // Initialize animations
    document.querySelectorAll('.job-landscape-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});