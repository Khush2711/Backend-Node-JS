const express = require("express");
const router = express.Router();
const signup = require("../Controller/SignUp");
const login = require("../Controller/login");
const {auth} = require("../Middleware/auth");
const student = require("../Middleware/Student");
const Admin = require("../Middleware/Admin");

router.post("/signup",signup);
router.post("/login",login);

router.get("/student",auth,student,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to students section"
    })
})

router.get("/admin",auth,Admin,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Admins section"
    })
})


module.exports = router;