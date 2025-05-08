const path = require('path');
const { sendEmail } = require('./utils/emailSender');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'applicationFormFile', maxCount: 1 },
  { name: 'privacyForm', maxCount: 1 }
]);

const submitApplication = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
          success: false,
          message: err.code === 'LIMIT_FILE_SIZE' ? 
            'File too large. Max 5MB allowed.' : 
            'File upload error'
        });
      } else {
        return res.status(400).json({ 
          success: false,
          message: err.message
        });
      }
    }

    // Check if all files were uploaded
    if (!req.files || !req.files.resume || !req.files.applicationFormFile || !req.files.privacyForm) {
      return res.status(400).json({ 
        success: false,
        message: 'All required files must be uploaded'
      });
    }

    const { name, email, phone, jobPosition, message } = req.body;
    const resumePath = req.files.resume[0].path;
    const appFormPath = req.files.applicationFormFile[0].path;
    const privacyFormPath = req.files.privacyForm[0].path;

    const emailText = `
      New Job Application Received
      
      Position Applied: ${jobPosition}
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      Cover Letter:
      ${message || 'No cover letter provided'}
      
      Files attached:
      - Resume
      - Application Form
      - Privacy Consent Form
    `;

    try {
      await sendEmail(
        process.env.EMAIL_TO,
        `New Application for ${jobPosition}`,
        emailText,
        [
          { path: resumePath },
          { path: appFormPath },
          { path: privacyFormPath }
        ]
      );
      
      res.status(200).json({ 
        success: true,
        message: 'Application submitted successfully!' 
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      res.status(500).json({ 
        success: false,
        message: 'Application received but failed to send confirmation email',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
};

module.exports = { submitApplication };
