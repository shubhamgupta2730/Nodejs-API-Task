// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      message: 'Provide the Token'
    });
  }
  try {
    const actualToken = token.split(' ')[1];
    const decodeToken = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decodeToken.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token',
    });
  }
};

module.exports = auth;
