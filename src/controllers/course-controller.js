const { StatusCodes } =require('http-status-codes');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const AppError =require('../utils/error/App-Error');
const {CourseService} = require('../service')


async function getCourses(request,response,next){
    try {
        const courses = await CourseService.getCourses(request);
        if(!courses){
            throw new AppError('No Courses Found',StatusCodes.NOT_FOUND);
        }
        SuccessResponse.data = courses;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('error in finding courses',error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


module.exports = {
    getCourses,
}