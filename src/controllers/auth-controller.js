const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse , ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error/App-Error');
const {AuthService} = require('../service');


async function registerUser(request,response,next){
    try {
        const user = await AuthService.registerUser(request);
        console.log('user back from service is ', user);
        SuccessResponse.data = user;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    registerUser,
}