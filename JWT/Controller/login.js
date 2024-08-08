const model = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    try {
        let {email,password} = req.body;

        let existingUser = await model.findOne({email});

        if(!existingUser)
        {
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            })
        }

        let pswcompare = await bcrypt.compare(password,existingUser.password);
        
        if(!pswcompare)
        {
            return res.status(404).json({
                success:false,
                message:"Password incorrect",
            })
        }

        let payload = {
            email:email,
            id:existingUser._id,
            role:existingUser.role
        }

        let token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        });
        
        existingUser = existingUser.toObject();
        existingUser.password = undefined;
        existingUser.token = token;

        const option = {
            expires : new Date( Date.now() + 3*24*60*60*1000),
            httpOnly : true
        }

        return res.cookie("token",token,option).status(200).json({
            success:true,
            message:"login successfully",
            existingUser
        })

    } catch (err) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}