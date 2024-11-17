const express = require('express');
const Vote = require('../models/vote');
const Forum = require('../models/forum');
const router = express.Router();


router.post("/", async (req, res) => {
    const data = req.body;
  
    try {
      const existingVote = await Vote.findOne({
        forumId: data.forumId,
        userId: data.userId
      });
  
      let result;
      if (!existingVote) {
        result = await Vote.create(data);
      } else {
        result = await Vote.updateOne(
          {
            forumId: data.forumId,
            userId: data.userId
          },
          {
            $set: { status: data.status }
          }
        );
      }
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  });


  router.get('/', async (req, res) => {
    try {
      const result = await Vote.find();
      res.send({ error: false, data: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  });


  router.get("/forum", async (req, res) => {
    try {
     
      const result = await Forum.find();
  
      
      const countVote = await Vote.aggregate([
        {
          $group: {
            _id: "$forumId",
            count: { $sum: 1 }
          }
        }
      ]);
  
      res.send({
        forum: result,
        voteList: countVote
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

module.exports = router;