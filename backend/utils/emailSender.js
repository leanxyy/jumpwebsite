const nodemailer = require('nodemailer');
require('dotenv').config();

// Debugging
console.log('Email Config Check:', {
  user: process.env.EMAIL_USER ? 'Configured' : 'MISSING',
  pass: process.env.EMAIL_PASS ? 'Configured' : 'MISSING',
  to: process.env.EMAIL_TO || 'MISSING'
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  headers: {
    'X-Priority': '1',
    'X-MSMail-Priority': 'High',
    'Importance': 'high'
  }
});

async function sendEmail(to, subject, text, attachments = []) {
  try {
    const recipients = (to || process.env.EMAIL_TO)
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    const mailOptions = {
      from: `"Jump Solutions" <${process.env.EMAIL_USER}>`,
      to: recipients.join(', '),
      subject: `[Important] ${subject}`,
      text: text,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
              ${text.replace(/\n/g, '<br>')}
             </div>`,
      attachments,
      priority: 'high'
    };

    console.log(`Attempting to send email to: ${recipients.join(', ')}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email delivered:', info.response);
    return info;
  } catch (error) {
    console.error('Email delivery failed:', error);
    throw error;
  }
}

module.exports = { sendEmail, transporter };