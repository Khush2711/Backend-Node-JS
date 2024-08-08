module.exports = async (req, res, next) => {
    
    try {
        if(req.user.role !== "Student")
        {
            res.status(401).json({
                success:false,
                message:"This is protected route for students"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}