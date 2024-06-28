const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/App-Error');
const {AuthService} = require('../service');
const { ServerConfig } = require('../config');
//desc    :    Register the User
//@access :    Public
async function registerUser(request,response,next){
    try {
        const user = await AuthService.registerUser(request);
        console.log('user back from service is ', user);
        const token = user.getJsonWebToken();
        console.log(token);
        SuccessResponse.data = user;
        SuccessResponse.token = token;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

//desc : SignIn the User
//@desc : Public
async function signInUser(request,response,next){
    try {
        const { email , password } =request.body;

        //validate email and password getting passed in the request
        if(!email || !password){
            ErrorResponse.message = `Please enter EmailId or Password`;
            return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        //checking whether the user exists in dataabse or not\
        const user = await User.findOne({email : email}).select('+password');
        console.log('user in the signin', user);
        if(!user){
            ErrorResponse.message = 'Invalid Creddentials';
            return response.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            ErrorResponse.message = 'Invalid Credentials';
            return response.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }

        //Now everything is correct so cretaing a token for the user
        user.password=undefined;

        /*
        SuccessResponse.data = user;
        SuccessResponse.token = await user.getJsonWebToken();
        return response.status(StatusCodes.OK).json(SuccessResponse);
        */
       sendTokenResponse(user,StatusCodes.OK,response);

    } catch (error) {
        console.log('Error while SignIn the User',error);
        ErrorResponse.error= error;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

//getting token from the user and sending token in response as well
async function sendTokenResponse(user,statusCode,response){
    try {
        console.log('Inside send token response');
        SuccessResponse.data = user;
        const token = await user.getJsonWebToken();
        SuccessResponse.token = token;
        console.log((ServerConfig.JWT_COOKIE_EXPIRE*24*60*60*1000)+Date.now());
        const options = {
            expires : new Date(Date.now() + (ServerConfig.JWT_COOKIE_EXPIRE*24*60*60*1000)),
            httpOnly : true,
        }

        if(process.env.NODE_ENV === 'Production'){
            options.secure = true
        }
        return response.status(statusCode).cookie('token',token,options).json(SuccessResponse);
    } catch (error) {
        console.log('error in sendToken Response', error);
    }
}



module.exports = {
    registerUser,
    signInUser,
}