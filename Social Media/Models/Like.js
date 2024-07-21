const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId, // Store Id of another object(data available in another collection in db)
        ref : "Post", // Post is name of collection
    },
    user : {
        type : String,
        required : true
    }
})


module.exports = mongoose.model('Like',LikeSchema);