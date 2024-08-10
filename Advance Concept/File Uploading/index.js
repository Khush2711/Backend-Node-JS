const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const fileupload = require("express-fileupload");
const PORT = process.env.PORT;

app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : "Controller/Files"
}));


const db_connection = require("./Config/DB_connect");
db_connection.connect();

const cloudinary = require("./Config/Cloudinary_config");
cloudinary.cloudinaryConnect();

const routes = require("./Routes/FileUpload");
app.use('/api/v1/upload',routes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

/*
    Image upload
    Video upload
    Image reduce and upload
    Local File Upload
*/