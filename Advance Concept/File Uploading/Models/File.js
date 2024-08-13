const mongoose = require("mongoose");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }
});


// POST middleware
fileSchema.post("save", async function (doc) {
    try {

        const transporter = require("../Config/Nodemailer");

        const info = await transporter.sendMail({
            from: 'Hacker',
            to: doc.email,
            subject: "New File Uploaded on cloudinary",
            html: `<h2>Hello Dear</h2><br>File Uploaded Successfully.<br><a href='${doc.imageUrl}' 
   style="display: inline-block; padding: 10px 20px; background-color: blue; color: white; border-radius: 25%; text-decoration: none;">
   Click Me
</a>
    `,
        });

        console.log(info);

    } catch (error) {
        console.log(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;