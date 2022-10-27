const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = async function(req,res){
    try {
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            //update the comment in post's comments array
            post.comments.push(comment);
            post.save();
            req.flash('success','Comment published');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error','Error in publishing comment');
        return;
    }
}

module.exports.destroyComment = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
            req.flash('success','Comment deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','Not authorized to delete this comment');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error','Error in deleting comment');
        return;
    }
}