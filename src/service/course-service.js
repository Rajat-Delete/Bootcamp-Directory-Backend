const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const {ErrorResponse} = require('../utils/common/');
const AppError = require('../utils/error/App-Error');
const {StatusCodes} = require('http-status-codes');

async function getCourses(request,response){
    try {
        let query;
        //console.log('id',request.params);
        if(request.params.id){
            console.log('inside');
            //here we need to find all the courses as per the bootcampId
            //validating the Id of the bootcamp
            if(!request.params.id.match(/^[0-9a-fA-F]{24}$/)){
                ErrorResponse.error = new AppError(`Please enter a Valid Id`,StatusCodes.BAD_REQUEST);
                ErrorResponse.message = `Please enter a Valid ObjectId`;
                return response.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
            }

            query = Course.find({bootcamp : request.params.id}).populate({
                path : 'bootcamp',
                select : 'name description', 
            });
        }else{
            query = Course.find().populate({
                path : 'bootcamp',
                select : 'name description',
            });
        }
        const Courses = await query;
        return Courses;
    } catch (error) {
        console.log('error in finding courses',error);
        throw error;
    }
}

async function getCourseById(id){
    try {
        const course = await Course.findById(id);
        return course;
    } catch (error) {
        throw error;
    }
}

async function createCourse(data){
    try {
        const bootcamp = await Bootcamp.findById(data.bootcamp);
        if(!bootcamp){
            throw new AppError(`No Bootcamp found for the Id ${data.bootcamp}`,StatusCodes.NOT_FOUND);
        }
        const course = await Course.create(data);
        return course;
    } catch (error) {
        console.log('error in course creation service', error);
        throw error;
    }
}

async function updateCourse(id,data){
    try {
        if(!await Course.findById(id)){
            throw new AppError(`No Courses Exists for the CourseId ${id}`,StatusCodes.NOT_FOUND);
        }   
        const course = await Course.findByIdAndUpdate(id,data,{
            new : true,
            runValidators : true
        });
        return course;
    } catch (error) {
        console.log('error in updating course');
        throw error;
    }
}

async function deleteCourseById(id){
    try {
        const course = await Course.findById(id);
        if(!course){
            throw new AppError(`No Course Found with the Id ${id}`,StatusCodes.NOT_FOUND);
        }
        await course.deleteOne();
        return course;
    } catch (error) {
        console.log('error in service>>',error);
        throw error;
    }
}


module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    deleteCourseById,
    updateCourse,
}