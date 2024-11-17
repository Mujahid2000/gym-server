const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');

// const Subscription = require('./src/models/Subscription');

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

  // verify trainer check
 



const galleryRoutes = require('./src/Routes/Gallery');
const trainer = require('./src/Routes/Trainer')
const weeklyschedule = require('./src/Routes/WeekelySchedule')
const trainerApply = require('./src/Routes//TrainerApply') 
const trainerBook = require('./src/Routes/TrainerBooked');
const updateVotes = require('./src/Routes/Vote');
const user = require('./src/Routes//Users')
const middleware = require('./src/Routes/middleware')

app.use('/gallery', galleryRoutes)
app.use('/trainer', trainer)
app.use('/weeklySchedule', weeklyschedule);
app.use('/trainerApply', trainerApply);
app.use('/trainerBooked', trainerBook);
app.use('/updateVotes', updateVotes);
app.use('/users', user);
app.use('/jwt',middleware)




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
