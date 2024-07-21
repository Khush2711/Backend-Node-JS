const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Comment"
    }]
})

module.exports = mongoose.model('Post', schema)