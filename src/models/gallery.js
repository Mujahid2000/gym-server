const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true,
        
    // },
    title: {
        type: String,
        required: true,
        
    },
    image: {
        type: String,
        required: true,
        
    }
})

const Gallery = mongoose.model('galleries', GallerySchema)

module.exports = Gallery;