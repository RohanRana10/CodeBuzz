const User = require('../models/user');

module.exports.profile = function(req,res){
    
    //check for available cookie
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){
                console.log(`Error in finding user profile`);
                return;
            }
            if(user){
                return res.render('user_profile',{
                    title: 'CodeBuzz | Profile',
                    user: user
                });
            }
            return res.redirect('/users/sign-in');
        })
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: 'CodeBuzz | Sign in'
    });
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: 'CodeBuzz | Sign up'
    });
}

module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log(`Error in user sign-up: ${err}`);
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log(`Error in creating user while sign-up: ${err}`);
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }

    });
}

module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log(`Error in sign-in: ${err}`);
            return;
        }
        //handle user not found
        if(!user){
            console.log(`Invalid username or password!`);
            return res.redirect('back');
        }
        //handle user found
        else{
            if(req.body.password != user.password){
                console.log(`Invalid username or password!`);
                return res.redirect('back');
            }
            else{
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }
        }
    });    
}

module.exports.destroySession = function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}