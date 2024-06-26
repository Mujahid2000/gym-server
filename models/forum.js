const mongoose = require('mongoose');


const ForumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    }
})

const Forum = mongoose.model('forum', ForumSchema);

module.exports = Forum;