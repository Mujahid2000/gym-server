const express = require('express');
const User = require('../models/user');
const Trainer = require('../models/trainer');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('./VerifyMiddleware');


router.post('/', async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const existingUser = await User.findOne(filter);
    
    if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
    }
    
    try {
        const newUser = new User(user);
        const result = await newUser.save();
        res.send({ message: "User created successfully", insertedId: result._id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error creating user", error });
    }
  });
  
  
  
  router.get('/', async(req, res) =>{
    try {
      const result = await User.find();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error creating user", error });
    }
  })


  router.patch('/admin/:id',verifyToken, verifyAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const filter = { _id: mongoose.Types.ObjectId(id) };
      const update = { $set: { role: 'admin' } };
      
      const result = await User.updateOne(filter, update);
      
      if (result.nModified === 0) {
        return res.status(404).send({ error: true, message: 'User not found or role is already set to admin' });
      }
      
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  });
  
  
  router.get('/admin/:email', verifyToken, async (req, res) => {
    const email = req.params.email;
   

    if (email !== req.decoded.email) {
        return res.status(403).send({ message: 'Forbidden access' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const admin = user.role === 'admin';
        res.send({ admin });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: true, message: 'Server side error' });
    }
});

  
  router.patch('/update/:email',  async (req, res) => {
    try {
      const email = req.params.email;
      const update = { $set: { name: req.body.name } };
  
      const result = await User.updateOne({ email: email }, update);
  
      if (result.nModified === 0) {
        return res.status(404).send({ error: true, message: 'User not found or name is already set to this value' });
      }
  
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  });

  router.get('/trainer/:email',verifyToken, async (req, res) => {
    const email = req.params.email;
  
    // Check if the email in the route matches the decoded email from the token
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: 'Forbidden access' });
    }
  
    try {
      // Find the trainer by email
      const trainer = await Trainer.findOne({ email });
  
      if (!trainer) {
        return res.status(404).send({ message: 'Trainer not found' });
      }
  
      // Check if the user is a trainer
      const isTrainer = trainer.role === 'trainer';
      res.send({ trainer: isTrainer });
    } catch (error) {
      console.error('Error fetching trainer:', error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  });


module.exports = router;