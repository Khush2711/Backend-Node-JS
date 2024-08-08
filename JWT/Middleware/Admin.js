module.exports = async (req, res, next) => {
    
    try {
        if(req.user.role !== "Admin")
        {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        })
    }
}