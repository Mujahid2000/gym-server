
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

router.post('/', async (req, res) => {
    try {
      const user = req.body;
      
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
      
      res.send({ token });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  });
  


  module.exports = router;
