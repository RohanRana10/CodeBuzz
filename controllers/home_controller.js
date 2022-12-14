const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){

    
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: 'CodeBuzz | Home',
    //         posts: posts
    //     });
    // });

    try {
        //populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },populate: {
                path: 'likes'//for the comments
            }
        }).populate('likes'); //for the post
        let users = await User.find({});

        return res.render('home',{
            title: 'CodeBuzz | Home',
            posts: posts,
            all_users: users
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return;
    }
}