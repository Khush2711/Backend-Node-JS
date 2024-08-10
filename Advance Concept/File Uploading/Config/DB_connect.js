const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("DB Connect Successfully...");
    }).catch((err) => console.log(err))
}