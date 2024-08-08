const model = require("../Model/userModel");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if(role !== "Admin" && role !== "Student" && role !== "Visitors")
            return res.status(409).json({
                success: false,
                message: "Select Appropriate Role"
        })


        let checkUserAvailable = await model.findOne({ email });
        if (checkUserAvailable) {
            return res.status(409).json(
                {
                    success: false,
                    message: "User already exists with this email",
                }
            )
        }

        password = await bcrypt.hash(password, 10);
        const result = new model({ name, email, password, role });
        const data = await result.save();

        return res.status(200).json(
            {
                success: true,
                message: "User signup successfully!!!",
            }
        )
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}