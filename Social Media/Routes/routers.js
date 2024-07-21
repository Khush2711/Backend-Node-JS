const express = require('express');
const router = express.Router();
const {createPost,getAllPosts} = require("../Controllers/PostController");
const comment = require('../Controllers/CommentController');
const {Likes,UnLike} = require('../Controllers/LikeController');


router.get('/',(req,res)=>{
    res.send(`Welcome`);
})

router.post('/post',createPost);
router.get('/post',getAllPosts);
router.post('/comment',comment);
router.post('/like',Likes);
router.delete('/unLike',UnLike);

module.exports = router;