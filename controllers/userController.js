// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Signup controller
const signup = async (req, res) => {
  const { username, password, dateOfBirth } = req.body;
  try {
    const presentUser = await User.findOne({ username });
    if (presentUser) {
      return res.status(400).json({
        message: 'User already present'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      dateOfBirth
    });

    await user.save();
    res.status(201).json({
      message: 'User signup successful',
      data: user,
    });
  } catch (error) {
    res.status(400).send('Error in Signup of the user: ' + error.message);
  }
};

// Signin controller
const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: 'User not found with this username'
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Invalid Password'
      });
    }

    const payload = {
      user: {
        username: user.username
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Profile controller
const profile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

module.exports = {
  signup,
  signin,
  profile
};
