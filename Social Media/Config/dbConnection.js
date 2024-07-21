const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function DB_Connection() {

    mongoose.connect(process.env.DB_URL).then(() => {
        console.log(`DB is connected`);
    })
        .catch((err) => {
            console.log(`Error Occured : ${err}`)
        })
}