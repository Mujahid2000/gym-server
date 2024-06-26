const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    exercise: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    exercise2: {
        type: String,
        required: true
    },
    instructor2: {
        type: String,
        required: true
    },
    exercise3: {
        type: String,
        required: true
    },
    instructor3: {
        type: String,
        required: true
    },
    exercise4: {
        type: String,
        required: true
    },
    instructor4: {
        type: String,
        required: true
    },
    exercise5: {
        type: String,
        required: true
    },
    instructor5: {
        type: String,
        required: true
    },
})


const Class = mongoose.model('ClassCollection' , ClassSchema);

module.exports= Class;