const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const model = require("../Models/File");


exports.localFileUpload = (req, res) => {
    try {
        const file = req.files.file;

        console.log(`File info : ${file}`, file);

        const path = __dirname + "/Files/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path, (err) => {
            console.log(err);
        });

        res.status(200).json({
            success: true,
            message: "Local File Uploaded Successfully"
        })
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

function fileTypeSupport(inputFile, SupportFileType) {
    return SupportFileType.includes(inputFile);
}

async function fileUploadToCloudinary(file, folder,quality) {
    let option = { folder, resource_type: "auto" };

    if(quality)
    {
        option.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, option);
}

/*
    async function VideoUploadToCloudinary(file, folder) {
        return await cloudinary.uploader.upload(file.tempFilePath, { folder, resource_type: "video" });
    }
*/

exports.imageUpload = async (req, res) => {

    const { name, email, tags } = req.body;

    try {

        if (!name || !email || !tags) {
            return res.status(400).json({
                success: false,
                message: "Kindly Provide All Details"
            })
        }

        const file = req.files.imageFile;
        const supporFileTypes = ["jpg", "jpeg", "png"];

        const inputFileType = file.name.split('.').pop();

        if (!fileTypeSupport(inputFileType, supporFileTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format Not Supported"
            })
        }

        const response = await fileUploadToCloudinary(file, "Images");

        // console.log("Data Store: ", response);

        if (!response) {
            res.status(500).json({
                success: false,
                message: "Something went wrong with cloudinary uploading process"
            })
        }

        let storeDB = await model.create({
            name,
            imageUrl: response.url,
            tags,
            email
        });


        return res.status(200).json({
            success: true,
            message: "File upload successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.videoUpload = async (req, res) => {

    const { name, email, tags } = req.body;

    try {

        if (!name || !email || !tags) {
            return res.status(400).json({
                success: false,
                message: "Kindly Provide All Details"
            })
        }

        const file = req.files.videoFile;
        console.log(file);

        const supporFileTypes = ["mp4"];

        const inputFileType = file.name.split('.').pop().toLowerCase();

        if (!fileTypeSupport(inputFileType, supporFileTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format Not Supported"
            })
        }


        const response = await fileUploadToCloudinary(file, "Video");


        console.log("Data Store: ", response);

        if (!response) {
            res.status(500).json({
                success: false,
                message: "Something went wrong with cloudinary uploading process"
            })
        }

        let storeDB = await model.create({
            name,
            imageUrl: response.url,
            tags,
            email
        });


        return res.status(200).json({
            success: true,
            message: "File upload successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.imageUploadAndReducer = async (req, res) => {

    const { name, email, tags } = req.body;

    try {

        if (!name || !email || !tags) {
            return res.status(400).json({
                success: false,
                message: "Kindly Provide All Details"
            })
        }

        const file = req.files.imageFile;
        const supporFileTypes = ["jpg", "jpeg", "png"];

        const inputFileType = file.name.split('.').pop();

        if (!fileTypeSupport(inputFileType, supporFileTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Format Not Supported"
            })
        }

        const response = await fileUploadToCloudinary(file, "Images",50);

        console.log("Data Store: ", response);

        if (!response) {
            res.status(500).json({
                success: false,
                message: "Something went wrong with cloudinary uploading process"
            })
        }

        let storeDB = await model.create({
            name,
            imageUrl: response.url,
            tags,
            email
        });


        return res.status(200).json({
            success: true,
            message: "File upload successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}