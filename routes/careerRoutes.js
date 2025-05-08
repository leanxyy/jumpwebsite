const express = require('express');
const { submitApplication } = require('../controllers/careerController'); // Fixed path
const router = express.Router();

router.post('/apply', submitApplication);

module.exports = router;
