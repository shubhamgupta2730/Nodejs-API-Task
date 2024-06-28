const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const signup = async (req, res) => {
  const { username, password, dateOfBirth } = req.body;
  try {

    const presentUser = await User.findOne({username});
    if(presentUser){
      return res.status(400).json({
        message: 'user already present'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      dateOfBirth
    })

    await user.save();
    res.status(201).json({
      message: 'user signup successful',
      data:user, 
    })
  } catch (error) {
    res.status(400).send('Error in Signup of the user: ' + error.message);
  }
}

module.exports = {
  signup
}

