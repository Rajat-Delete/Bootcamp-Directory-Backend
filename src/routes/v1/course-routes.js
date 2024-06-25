const express = require('express');
const router = express.Router({mergeParams : true});
const {CourseController} = require('../../controllers');
const {Validators} = require('../../utils/common')


//this is typically reffering to api/v1/courses which is a GET request
router.get('/',CourseController.getCourses);

//this is typically referring to api/v1/courses/:id which is a GET request
router.get('/:id',Validators.validateIdPresent,Validators.validateRequestId,CourseController.getCourseById);

//this is typically reffering to api/v1/bootcamps/:id/courses/ which will be a POST request
router.post('/',CourseController.createCourse);

//this is typically reffering to api/v1/courses/:id which will be a PUT request
router.put('/:id',Validators.validateIdPresent,Validators.validateRequestId,CourseController.updateCourseById);

//this is typically reffering to api/v1/courses/:id which will be a DELETE request
router.delete('/:id',Validators.validateIdPresent,Validators.validateRequestId,CourseController.deleteCourseById);

module.exports = router;


