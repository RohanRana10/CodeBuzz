const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
    });

    return res.status(200).json({
        message: "List of posts",
        posts: posts
    });
}

module.exports.destroyPost = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
        // *-- user.id converts to string for using == , instead of user._id --*

        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.status(200).json({
                message: "Post and associated comments deleted!"
            });
        }else{
            return res.status(401).json({
                message: "Not authorized to delete this post!"
            });
        }
    } catch (error) {
        // req.flash('error','Error in deleting post');
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}