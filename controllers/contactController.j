const { sendEmail } = require('./utils/emailSender');

const submitContactForm = async (req, res) => {
    try {
        const { name, email, message, phone } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ 
                message: 'Name, email, and message are required fields' 
            });
        }

        const emailText = `
            New Contact Form Submission
            
            Name: ${name}
            Email: ${email}
            Phone: ${phone || 'Not provided'}
            Message: ${message}
        `;

        await sendEmail(
            process.env.EMAIL_TO, 
            'New Contact Form Submission', 
            emailText
        );

        res.status(200).json({ 
            message: 'Thank you for contacting us! We will get back to you soon.' 
        });
    } catch (error) {
        console.error('Error in contact form submission:', error);
        res.status(500).json({ 
            message: 'Failed to send message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { submitContactForm };
