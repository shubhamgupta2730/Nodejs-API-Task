const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/profile',auth,  userController.profile);


module.exports = router;