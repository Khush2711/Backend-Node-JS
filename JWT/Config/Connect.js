require("dotenv").config();


const mongoose = require("mongoose");
const url = process.env.MONGO_DB;

module.exports = function connect() {
    mongoose.connect(url)
        .then(() => {
            console.log("Connect Successfully");
        })
        .catch((err) => {
            console.log("Something went Wrong!!!");
        })
}