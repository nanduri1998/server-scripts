const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

module.exports.register =(req,res,next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.password = req.body.password;
    user.devices = req.body.devices;
    user.save((err, doc ) => {
        if(!err) {
            res.send(doc);
        }
        else {
            if(err.code == 11000) {
                res.status(422).send(['Duplicate E-mail address found.']);
            }
            else {
                return next(err);
            }
        }
    });
}

module.exports.authenticate = (req, res, next) => {
    //Passport Authentication
    passport.authenticate('local',(err, user, info)=> {
        //error from middleware
        if(err){
            return res.status(400).json(err);
        }
        //Authentication Successful & generate JWT token
        else if (user) {
            return res.status(200).json({ "token":  user.generateJwt() });
        }
        //Wrong Password
        else {
            return res.status(404).json(info);
        }
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
            (err, user) => {
                if(!user) {
                    return res.status(404).json({ status: false, message: 'User record not found' });
                }
                else {
                    return res.status(200).json({ status: true, user: _.pick(user,['fullName','email','phoneNumber','address'])});
                }
            }
        );
}