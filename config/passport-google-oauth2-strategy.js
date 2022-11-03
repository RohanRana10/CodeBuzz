const passport  = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "187684535388-t166jrqdkdccl4lgiogivlb3a16v5q3o.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},function(accessToken, refreshToken, profile, done){
    //find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in googleStrategy-Passport',err);
            return;
        }
        console.log(profile);
        if(user){
            //if found set the user as req.user
            return done(null, user);
        }
        else{
            //if not found create the user first and set the user as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err,user){
                if(err){
                    console.log('error in creating user in googleStrategy-Passport',err);
                    return;
                }
                return done(null, user)
            });
        }
    });
}));

module.exports = passport;