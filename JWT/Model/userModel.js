const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true,
        trim:true
    },
    email :{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["Student","Admin","Visitor"]
    }
});

module.exports = mongoose.model('Users',userSchema);