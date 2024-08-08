const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try {
        const token = req.body.token;

        if(!token){
            res.status(401).json({
                success:false,
                message:"Token Missing",
            })
        }

        try {
            const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decodeToken;            
            
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:'Token is invalid'
            })
        }
        next();


    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Internal Server Error'
        })   
    }
}