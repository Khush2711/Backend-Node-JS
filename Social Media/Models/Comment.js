const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId, // Store Id of another object(data available in another collection in db)
        ref : "Post", // Post is name of collection
    },
    user : {
        type : String,
        required : true
    },
    body:{
        type : String,
        required : true
    }
})


module.exports = mongoose.model('Comment',commentSchema);