const express = require('express');
const TrainerBooked = require('../models/trainerBook');
const router = express.Router();

router.post('/', async(req, res) =>{

    try {
      const {userEmail, photo,userName,packageName, selectedSlot, trainerName, price} = req.body;
      const TrainerApply = new TrainerBooked({
        userEmail, 
        photo,userName,
        packageName, 
        selectedSlot, 
        trainerName, 
        price
      })
      await TrainerApply.save()
      res.status(201).json(TrainerApply)
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  })



  router.get('/', async(req, res) =>{
    try {
      const result = await TrainerBooked.find();
      res.json(result)
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  })



  router.get('/:trainerName', async (req, res) => {
    try {
        const name = req.params.trainerName;
        
        // const filter = ;
        const result = await TrainerBooked.find({ trainerName : name });  
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, message: 'Server side error' });
    }
  });
  

module.exports = router;