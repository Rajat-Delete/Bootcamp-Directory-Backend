const Course = require('../models/Course');
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


module.exports = {
    getCourses,
}