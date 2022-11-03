const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true 
    },
    function(req,email, password, done){
        User.findOne({email: email}, function(err,user){
            if(err){
                req.flash('error','Error in finding user');
                return done(err); 
            }
            if(!user || user.password != password){
                req.flash('error','Invalid username or password');
                return done(null, false);
            }
            //set user in cookie
            return done(null, user);
        });
    }
));

//serializing the user decides which key is to be kept in the cookies (to browzer side)
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//de-serializing the user from the key in the cookies (to server side)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log(`Error in finding user --> passport`);
            return done(err); 
        }
        return done(null,user);
    });
});

//check if the user is authenticated(used as a middleware)
passport.checkAuthentication = function(req,res,next){
    //if user is signed in, pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}
module.exports = passport;