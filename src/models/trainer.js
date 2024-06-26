const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    0: { type: String },
    1: { type: String },
    2: { type: String },
    3: { type: String },
    4: { type: String },
    5: { type: String },
    6: { type: String },
    7: { type: String },
}, { _id: false }); // 

// Trainer Schema
const TrainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    skills: {
        type: [String], // Changed to array of strings
        required: true,
    },
    availableTimeWeek: {
        type: String,
        required: true,
    },
    schedule: {
        type: ScheduleSchema, 
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true, // Added trim to clean up email inputs
    },
    title: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    experience: {
        type: String, 
        required: true,
    }
});


const Trainer = mongoose.model('trainers', TrainerSchema);

module.exports = Trainer;