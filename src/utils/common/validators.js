const { StatusCodes } = require('http-status-codes');
const AppError = require('../error/App-Error');
const ErrorResponse = require('./Error-response');


function validateRequestId(request,response,next){
    if(!request.params.id.match(/^[0-9a-fA-F]{24}$/)){
        ErrorResponse.error = new AppError(`Please enter a Valid Id`,StatusCodes.BAD_REQUEST);
        ErrorResponse.message = `Please enter a Valid ObjectId`;
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
    // try {
    //     console.log('Incoming requestId is>>',request.params.id);
    //     const id = request.params.id;
    //     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //         throw new AppError(`Please enter a Valid Id`,StatusCodes.BAD_REQUEST);
    //     }
    //     next();
    // } catch (error) {
    //     ErrorResponse.error = error;
    //     ErrorResponse.Message = error.message;
    //     return response.status(error.statusCode).json(ErrorResponse);
    // }
}

function validateIdPresent(request,response,next){
    if(!request.params.id){
        ErrorResponse.error = new AppError(`Id was not present in the Incoming request`,StatusCodes.BAD_REQUEST);
        ErrorResponse.message = 'Please enter a Id';
        return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}
module.exports = {
    validateRequestId,
    validateIdPresent,
}