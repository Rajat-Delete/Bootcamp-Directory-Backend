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

async function getCourseById(request, response,next){
    try {
        
    } catch (error) {
        
    }
}

async function createCourse(request,response,next){
    try {
        
    } catch (error) {
        
    }
}

async function updateCourseById(request,response,next){
    try {
        
    } catch (error){
        
    }
}

async function deleteCourseById(request,response,next){
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
}