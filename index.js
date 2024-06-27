const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');

const jwt = require('jsonwebtoken');
// const Subscription = require('./src/models/Subscription');
const Gallery = require('./src/models/gallery');
const Trainer = require('./src/models/trainer');
const TrainerApply = require('./src/models/trainerApply');
const Class = require('./src/models/class');
const TrainerBooked = require('./src/models/trainerBook');
const User = require('./src/models/user');
const Vote = require('./src/models/vote');
const Forum = require('./src/models/forum');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Protected route example
app.post('/jwt', async (req, res) => {
  try {
    const user = req.body;
    
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
    res.send({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).send({ error: true, message: 'Server side error' });
  }
});

  // middlewares
  const verifyToken = (req, res, next) => {
  // console.log('Inside verify token middleware:', req.headers.authorization);
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
  // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        return res.status(401).send({ message: 'Unauthorized access' });
      }
      req.decoded = decoded;
      // console.log(req.decoded);
      next();
    });
  };
  



  // verify admin check
  const verifyAdmin = async (req, res, next) => {
    try {
      const email = req.decoded.email;
      const user = await User.findOne({ email: email });
  
      if (!user || user.role !== 'admin') {
        return res.status(403).send({ message: 'Forbidden access' });
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
    }
  };

  // verify trainer check
  app.get('/users/trainer/:email', verifyToken, async (req, res) => {
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

  // subscribe

//   app.post('/subscribe', async (req, res) =>{
//     const {name, email} = req.body;
//    try {
//     const newUser = new Subscription({
//       name,
//       email
//     })
//     await newUser.save();
//     res.status(201).json(newUser);
//    } catch (error) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//    }
// })

// subscribe

// app.get('/subscribe', verifyAdmin, async(req, res) =>{
//   try {
//     const result = await Subscription.find()
//     res.json(result);
//   } catch (error) {
//     console.error(error.message); 
//     res.status(500).send('Server Error');
//   }
// })


app.get('/gallery', async(req, res) =>{
  try {
    const result = await Gallery.find()
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})

app.get('/trainer', async(req, res) =>{
  try {
    const result = await Trainer.find();
    res.json(result)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})

app.get('/trainer/:id', async(req, res) =>{
  try {
    const id = req.params.id;
    const result = await Trainer.findById(id);
    res.send(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})


app.post('/trainerApply', async(req, res) =>{
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

app.get('/trainerApply', verifyAdmin, async(req, res) =>{
  try {
    const result = await TrainerApply.find();
    res.json(result)
  } catch (error) {
    console.error('server error');
    res.status(500).send('Server Error')
  }})


  
app.get('/weeklySchedule', async(req, res) =>{
  try {
    const result = await Class.find();
    res.json(result)
  } catch (error) {
    console.error('server error');
    res.status(500).send('Server Error')
  }
})

app.patch('/trainerApply/:id', async (req, res) => {
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


app.post('/trainerBooked', async(req, res) =>{

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

app.get('/trainerBooked', async(req, res) =>{
  try {
    const result = await TrainerBooked.find();
    res.json(result)
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: true, message: 'Server side error' });
  }
})


app.get('/trainerBooked/:trainerName', async (req, res) => {
  try {
      const name = req.params.trainerName;
      console.log(name);  
      // const filter = ;
      const result = await TrainerBooked.find({ trainerName : name });  
      res.json(result);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, message: 'Server side error' });
  }
});



// user register data

app.post('/users', async (req, res) => {
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



app.get('/users', async(req, res) =>{
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user", error });
  }
})



app.post("/updateVotes", async (req, res) => {
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




// app.get('/updateVotes', async(req, res) =>{
//   try {
//     const result = await Vote.find();
//     res.send(result);    
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: true, message: 'Server side error' });
//   }
// })

app.get('/updateVotes', async (req, res) => {
  try {
    const result = await Vote.find();
    res.send({ error: false, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: true, message: 'Server side error' });
  }
});


app.get("/forum", async (req, res) => {
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

app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
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

app.get('/users/admin/:email', verifyToken, async (req, res) => {
  const email = req.params.email;

  // Check if the email in the route matches the decoded email from the token
  if (email !== req.decoded.email) {
    return res.status(403).send({ message: 'Forbidden access' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the user is an admin
    const admin = user.role === 'admin';
    res.send({ admin });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ error: true, message: 'Server side error' });
  }
});

app.patch('/users/update/:email', verifyToken, async (req, res) => {
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



// payment add here






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
