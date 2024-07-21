const PostModel = require("../Models/Post");


exports.createPost = async (req,res)=>{
    try{
        const {user,title,body,likes,comments} = req.body;

        let storeData = new PostModel({user,title,body,likes,comments});
        let savePost = await storeData.save();

        return res.status(200).json({
            message:savePost
        })
    }
    catch(err)
    {
        return res.status(500).json({
            error:`${err}`,
            message:"Error While Creating Post"
        })
    }
    
}

exports.getAllPosts = async (req,res)=>{
    try{
        
        let model = new PostModel();
        let data = await PostModel.find({}).populate('likes').populate('comments');

        return res.status(200).json({
            data
        })
    }
    catch(err)
    {
        return res.status(500).json({
            error:`${err}`,
            message:"Error While Creating Post"
        })
    }
    
}