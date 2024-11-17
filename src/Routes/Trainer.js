const express = require('express');
const Trainer = require('../models/trainer');
const router = express.Router();

router.get('/', async(req, res) =>{
    try {
      const result = await Trainer.find();
      res.json(result)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })

// single trainer data get
  router.get('/:id', async(req, res) =>{
    try {
      const id = req.params.id;
      const result = await Trainer.findById(id);
      res.send(result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })


  

module.exports = router;