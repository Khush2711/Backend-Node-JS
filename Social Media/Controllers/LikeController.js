const LikeModel = require("../Models/Like");
const PostModel = require("../Models/Post");

// For storing object we have to instantiate model with 'new' keyword
// For deleting/updating 'new' keyword is not required

exports.Likes = async (req,res)=>{
    const {post,user} = req.body;

    try{
        const obj = new LikeModel({post,user});
        const likeId = await obj.save();
        const updateLikeArrayOfPost = await PostModel.findByIdAndUpdate(post,{$push:{likes:likeId._id}},{new:true})
                                        .populate("likes");
        return res.status(200).json({
            updateLikeArrayOfPost
        })
    }
    catch(err)
    {
        return res.status(500).json({
            error : `${err}`,
            message:"Something Went Wrong"
        })
    }
}

exports.UnLike = async (req,res)=>{
    const {post,user,like} = req.body;

    try{
        const deletedLike = await LikeModel.deleteOne({_id:like,post:post});
        const result = await PostModel.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true}).populate('likes').populate('comments');

        return res.status(200).json({
            result
        })

    }
    catch(err)
    {
        return res.status(500).json({
            error : `${err}`,
            message:"Something Went Wrong"
        })
    }
}