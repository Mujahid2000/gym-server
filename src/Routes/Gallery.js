const express = require('express');
const Gallery = require('../models/gallery');
const router = express.Router();

router.get('/', async(req, res) =>{
    try {
      const result = await Gallery.find()
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })


module.exports = router;