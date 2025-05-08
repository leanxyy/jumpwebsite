const express = require('express');
const { submitApplication } = require('../controllers/careerController.js'); // Fixed path
const router = express.Router();

router.post('/apply', submitApplication);

module.exports = router;
