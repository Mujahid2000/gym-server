const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();
// Middleware to verify token

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).send({ message: 'Unauthorized access: No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  if (!token) {
      return res.status(401).send({ message: 'Unauthorized access: Malformed token.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          console.error('Token verification failed:', err);
          return res.status(401).send({ message: 'Unauthorized access: Invalid token.' });
      }

      req.decoded = decoded; // Set decoded token payload
      next();
  });
};

        
      
      
      
        // verify admin check
        const verifyAdmin = async (req, res, next) => {
          try {
              if (!req.decoded || !req.decoded.email) {
                  return res.status(403).send({ message: 'Unauthorized access: No decoded email.' });
              }
      
              const email = req.decoded.email;
              const user = await User.findOne({ email });
      
              if (!user || user.role !== 'admin') {
                  return res.status(403).send({ message: 'Forbidden access: Admin only.' });
              }
      
              next();
          } catch (error) {
              console.error(error);
              res.status(500).send({ error: true, message: 'Server side error' });
          }
      };
      

module.exports = {
    verifyToken,
    verifyAdmin
};
