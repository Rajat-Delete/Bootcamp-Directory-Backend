const { ErrorResponse } = require("../utils/common");
const User = require('../models/User');
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/App-Error");
const jwt = require('jsonwebtoken');
const { ServerConfig } = require("../config");


// function to verify the Incoming request
async function protectRoutes(request,response,next){
    try {
        //user will be either sending the token in either body or cookies
        console.log('1>>>',request.headers);
        console.log('2>>',request.cookies);
        let token;
        if(!request.headers.authorization || !request.headers.authorization.startsWith('Bearer')){
            ErrorResponse.Message = 'Not Authorised to access the Route';
            ErrorResponse.error = new AppError(`No Bearer Token Found in the Incoming Request`,StatusCodes.BAD_REQUEST)
            return response.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }else{
            token = request.headers.authorization.split(' ')[1];
            console.log('Token in Incoming request is>>', token);
        }

        try{
            //Now once we got the token then we need to extract the payload from it
            const decoded = jwt.verify(token, ServerConfig.JWT_PRIVATE_KEY);
            console.log('decoded Payload is >>', decoded);

            //now we have to validate the userId from the decoded poyload
            request.user = await User.findById(decoded.id);
            console.log('request.user>>', request.user);


        }catch(error){
            console.log('error is decoding the token');
            throw new AppError('Not Authorised to access the Route',StatusCodes.UNAUTHORIZED);
        }
        
        next();
    } catch (error) {
        console.log('Error in protectRoutes',error);
        ErrorResponse.error = error;
        ErrorResponse.Message =error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    protectRoutes,
}