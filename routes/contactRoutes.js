const express = require('express');
const { submitContactForm } = require('../controllers/contactController.js');
const router = express.Router();

router.post('/send', submitContactForm);

module.exports = router;
