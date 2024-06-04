const Course = require('../models/Course');


async function getCourses(request){
    try {
        if(request.params.bootcampId){
            //here we need to find all the courses as per the bootcampId
            
        }else{
            const courses  = await Course.find();
            return courses;
        }
    } catch (error) {
        console.log('error in finding courses',error);
        throw error;
    }
}


module.exports = {
    getCourses,
}