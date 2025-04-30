document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formResponse.innerHTML = '';
        formResponse.className = 'form-response';

        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Send to server
        fetch('/contact/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || 'Network response was not ok');
                });
            }
            return response.json();
        })
        .then(data => {
            formResponse.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i> ${data.message}
                </div>`;
            formResponse.className = 'form-response success';
            contactForm.reset();
        })
        .catch(error => {
            formResponse.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i> 
                    ${error.message || 'There was an error sending your message. Please try again later.'}
                </div>`;
            formResponse.className = 'form-response error';
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
            formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
});