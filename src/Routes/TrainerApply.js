const express = require('express');
const TrainerApply = require('../models/trainerApply');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('./VerifyMiddleware');
const { default: mongoose } = require('mongoose');
const Trainer = require('../models/trainer');





router.post('/', async(req, res) =>{
    const {
      name, age, image, skills, availableTimeWeek,
      schedule, about, role, email, title, salary, experience
  } = req.body;
    try {
      const trainerApply = new TrainerApply({
        name,
        age,
        image,
        skills,
        availableTimeWeek,
        schedule,
        about,
        role,
        email,
        title,
        salary,
        experience,
      })
      await trainerApply.save();
      res.status(201).json(trainerApply)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
    }
  })
  
  router.get('/',verifyToken,verifyAdmin, async(req, res) =>{
    try {
      const result = await TrainerApply.find();
      res.json(result)
    } catch (error) {
      console.error('server error');
      res.status(500).send('Server Error')
    }})


    router.patch('/:id', async (req, res) => {
      try {
          const id = req.params.id;
          const data = req.body
          console.log(data);
          const filter = { _id:new  mongoose.Types.ObjectId(id) };
          const trainerApply = await TrainerApply.findOne(filter);
          if (!trainerApply) {
              return res.status(404).send({ error: true, message: 'Trainer application not found' });
          }
          trainerApply.role = "trainer";
          const newTrainer = new Trainer(trainerApply.toObject());
          const insertedTrainer = await newTrainer.save();
          await TrainerApply.deleteOne(filter);
          res.status(200).send({ insertedTrainer, message: "Trainer role updated and moved successfully" });
    
      } catch (error) {
          console.error(error);
          res.status(500).send({ error: true, message: 'Server side error' });
      }
    });


module.exports = router;