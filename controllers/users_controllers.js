const User = require('../models/user');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            req.flash('error','Error in finding user');
            return;
        }
        return res.render('user_profile',{
            title: 'CodeBuzz | Profile',
            profile_user: user
        });
    });
    
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title: 'CodeBuzz | Sign in'
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title: 'CodeBuzz | Sign up'
    });
}

//user sign up
module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            req.flash('error','Error in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    req.flash('error','Error in creating user while sign-up');
                    return;
                }
                req.flash('success','Sign up successful');
                return res.redirect('/users/sign-in');
            })
        }
        else{
            req.flash('error','This Email already exists');
            return res.redirect('back');
        }

    });
}

module.exports.updateUser = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','User details updated');
            return res.redirect('back');
        });
    }
    else{
        req.flash('error','Not authorized to update user');
        return res.redirect('back');
    }
    
}

//sign-in
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

//sign out using logout function of passport
module.exports.destroySession = function(req,res,next){
    // req.logOut();
    // return res.redirect('/');
    
    req.logout(function(err){
        if(err){ 
            return next(err); 
        }
        req.flash('success', 'You have logged out');
        res.redirect('/');
    });
}