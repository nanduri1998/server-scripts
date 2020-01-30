const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


var userSchema =  new mongoose.Schema({
    fullName: {
        type: String,
        required : 'Full Name can\'t be empty'
    },
    email: {
        type: String,
        required : 'E-mail can\'t be empty',
        unique: true
    },
    phoneNumber: {
        type: String,
        required: 'Phone Number can\'t be empty',
        minlength: [10,'Invalid Phone Number'],
        unique: true
    },
    address : {
        type: String,
        required: 'Address can\'t be empty'
    },
    devices: {
        type: String,
        required: 'Device-ID can\'t be empty'
    },
    password: {
        type: String,
        required : 'Password can\'t be empty',
        minlength: [8, 'Password must be atleast 8 characters long']
    },
    saltSecret: String
});

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid E-mail.');

userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(this.password,salt,(err,hash) =>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});



//Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


userSchema.methods.generateJwt = function(){
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}




mongoose.model('User',userSchema,'users');