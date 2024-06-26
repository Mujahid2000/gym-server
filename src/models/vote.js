const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    forumId: {
        type: String,
        required: true
    },    
    userId: {
        type: String,
        required: true
    },   
    status: {
        type: String,
        required: true
    },
})

const Vote = mongoose.model('vote', VoteSchema);

module.exports = Vote;