const mongoose = require('mongoose');


const TrainerBookingSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    packageName: {
        type: String,
        required: true
    },
    selectedSlot: {
        type: String,
        required: true
    },
    trainerName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})


const TrainerBooked = mongoose.model('trainerBook', TrainerBookingSchema);

module.exports = TrainerBooked;