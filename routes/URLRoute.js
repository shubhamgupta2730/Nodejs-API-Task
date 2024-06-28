const express = require('express');
const router = express.Router();
const { generateShortURL } = require('../controllers/URLController');

router.post('/shorten', generateShortURL);

module.exports = router;
