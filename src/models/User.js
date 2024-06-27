const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../config');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter a valid Name']
    }, 
    email : {
        type: String,
        required : [true, 'Please enter a Valid EmailId'],
        unique : true,
        match : [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,'Please enter a valid EmailId of User']
    },
    role : {
        type : String,
        enum : ['user','publisher'],
        default : 'user',
    },
    password : {
        type : String,
        select : false,
        required : [true, 'Please enter a valid Password'],
        minlength : 6,
    },
    resetPasswordToken : String,
    resetPasswordExpired : Date,
    createdAt : {
        type : Date,
        default : Date.now
    }
});

//encrypting the passowords before they are stored in database
UserSchema.pre('save', async function (next){
    console.log('inside user password hashing');
    //generating the salt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//generating the json web token
UserSchema.methods.getJsonWebToken = function (){
    console.log('Inside json web token create');
    return jwt.sign({id : this._id}, ServerConfig.JWT_PRIVATE_KEY,{
        expiresIn : ServerConfig.JWT_TOKEN_EXPIRE
    });
}

//match user entered password with the encrypted password existing in the database
UserSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User',UserSchema);