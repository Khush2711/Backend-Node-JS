require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 2711;
const connectDB = require('./Config/Connect');
const routes = require("./Routes/routes");

connectDB();

app.use(express.json());
app.use("/api/v1",routes);


app.listen(PORT,()=>{
    console.log(`Sever is running on http://localhost:${PORT}`);
});