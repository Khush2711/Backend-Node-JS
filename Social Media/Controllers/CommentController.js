const CommentModel = require("../Models/Comment");
const PostModel = require("../Models/Post");


module.exports = async (req, res) => {
    try {
        const { post, user, body } = req.body;
        let storeData = new CommentModel({ post, user, body });
        let result = await storeData.save();

        // Post id se find karo post ko 
        // Push - update karo but kya update karo?
        // comments naam k array ko.
        // kya insert karna hai comments array mai?
        // result object ki id
        const UpdatePostCommentArray = await PostModel.findByIdAndUpdate(post, { $push: { comments: result._id } }, {new:true})
        .populate("comments");

        res.json({
            post:UpdatePostCommentArray,
            status:200
        });
    }
    catch (err) {
        return res.status(500).json({
            error:err,
            message:"Error While Creating Message"
        })
    }

}