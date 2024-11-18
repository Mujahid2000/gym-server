const express = require('express');
const Forum = require('../models/forum');
const Vote = require('../models/vote');
const router = express.Router();

router.get("/", async (req, res) => {
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