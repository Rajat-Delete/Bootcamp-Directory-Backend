const { StatusCodes } =require('http-status-codes');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const AppError =require('../utils/error/App-Error');
const {CourseService} = require('../service')


// desc : Get All Courses
//@acess : public
//desc : Get Courses for specific Bootcamp
//@access : public
async function getCourses(request,response,next){
    try {
        const courses = await CourseService.getCourses(request,response);
        
        const CoursesCount = courses.length;
        if(courses.length === 0){
                throw new AppError('No Courses Found',StatusCodes.NOT_FOUND);
            }
        SuccessResponse.count = CoursesCount;
        SuccessResponse.data = courses;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('error in finding courses',error);
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


//desc : find course by Id
//@access : public
async function getCourseById(request, response,next){
    try {
        const course = await CourseService.getCourseById(request.params.id);
        if(!course){
            ErrorResponse.message = `No Course found with the Id ${request.params.id}`;
            return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        delete SuccessResponse.count;
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


//desc : creating new Course for the bootcamp
//@access : private
async function createCourse(request,response,next){
    try {
        //taking the bootcampId from the Url params and pushing it to request body
        request.body.bootcamp = request.params.id;
        const course = await CourseService.createCourse(request.body);
        SuccessResponse.data = course;
        delete SuccessResponse.count;
        delete SuccessResponse.pagination;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        if(error.statusCode === StatusCodes.NOT_FOUND){
            ErrorResponse.message = error.message;
            return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateCourseById(request,response,next){
    try {
         // so we will be getting id from the params and data in the body for update
         const course = await CourseService.updateCourse(request.params.id,request.body);
         SuccessResponse.data = course;
         delete SuccessResponse.count;
         delete SuccessResponse.pagination;
         return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error){
        ErrorResponse.error = error;
        if(error.statusCode = StatusCodes.NOT_FOUND){
            ErrorResponse.message = error.message;
            return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteCourseById(request,response,next){
    try {
        console.log('trying to delete course');
        const course = await CourseService.deleteCourseById(request.params.id);
        SuccessResponse.data = course;
        return response.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        if(error.statusCode === StatusCodes.NOT_FOUND){
            ErrorResponse.message = error.message;
            return response.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
        }
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
}