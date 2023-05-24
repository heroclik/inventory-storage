const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs/jwt.js');

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.body.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid token',token});
    }

    if (decoded.role == 3){
      req.userId = decoded.userId;
      next();
    }
    else {
      // console.log(decoded.role);
      return res.status(403).json({ message: 'Access denied ',token});
      
    }
    
  });
}

module.exports = { authenticateToken };
