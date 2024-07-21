require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 2711;
const dbConnection = require('./Config/dbConnection');
const router = require('./Routes/routers');


dbConnection();

app.use(express.json());
app.use('/api/v1',router);


app.listen(PORT,()=>{
    console.log(`Server Starts at http://localhost:${PORT}`)
});