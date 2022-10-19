const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log(`Error in finding the post: ${err}`);
            return;
        }
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){
                    console.log(`Error in creating a comment: ${err}`);
                    return;
                }
                //update the comment in post's comments array
                post.comments.push(comment);
                post.save();

                return res.redirect('back');
            });
        }
    });
}

module.exports.destroyComment = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            console.log(`Error in deleting a comment: ${err}`);
            return;
        }
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}},function(err,post){
                return res.redirect('back');
            });

        }
        else{
            res.redirect('back');
        }
    })
}