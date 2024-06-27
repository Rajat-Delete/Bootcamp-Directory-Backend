const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/App-Error');
const {AuthService} = require('../service');

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
        SuccessResponse.data = user;
        SuccessResponse.token = await user.getJsonWebToken();
        return response.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error= error;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}



module.exports = {
    registerUser,
    signInUser,
}