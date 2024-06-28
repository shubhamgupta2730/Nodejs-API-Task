const express = require('express');
const checkAgeController = require('../controllers/checkAgeController');


const router = express.Router();

router.post('/check-age',  checkAgeController.checkAge);

module.exports = router;