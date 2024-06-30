const express = require('express');
const router = express.Router();
const { generateShortURL, handleRedirect } = require('../controllers/URLController');

router.post('/shorten', generateShortURL);
router.get('/:shortId', handleRedirect);

module.exports = router;
