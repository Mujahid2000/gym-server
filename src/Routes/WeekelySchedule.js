const express = require('express');
const Class = require('../models/class');
const router = express.Router()


router.get('/', async(req, res) =>{
    try {
      const result = await Class.find();
      res.json(result)
    } catch (error) {
      console.error('server error');
      res.status(500).send('Server Error')
    }
  })

module.exports = router;