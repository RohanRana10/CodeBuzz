const Post = require('../models/post');

module.exports.createPost = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log(`Error in creating a post: ${err}`);
            return;
        }
        return res.redirect('back');
    });
}