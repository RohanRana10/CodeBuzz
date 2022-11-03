const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req,res){
    // req.flash('success', 'Logged in Successfully');
    // return res.redirect('/');
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }
        return res.status(200).json({
            message: "Sign in successfull",
            data: {
                token: jwt.sign(user.toJSON(),'codeBuzz',{
                    expiresIn: '100000'
                })
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
    

}