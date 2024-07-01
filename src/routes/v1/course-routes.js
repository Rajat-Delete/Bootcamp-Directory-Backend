const express = require('express');
const router = express.Router({mergeParams : true});
const {CourseController} = require('../../controllers');
const {Validators} = require('../../utils/common');
const { protectRoutes } = require('../../middlewares/auth-middleware');
const {AuthController} = require('../../controllers');


//this is typically reffering to api/v1/courses which is a GET request
router.get('/',CourseController.getCourses);

//this is typically referring to api/v1/courses/:id which is a GET request
router.get('/:id',Validators.validateIdPresent,Validators.validateRequestId,CourseController.getCourseById);

//this is typically reffering to api/v1/bootcamps/:id/courses/ which will be a POST request
router.post('/',protectRoutes,AuthController.validateUserRoles,CourseController.createCourse);

//this is typically reffering to api/v1/courses/:id which will be a PUT request
router.put('/:id',protectRoutes,Validators.validateIdPresent,Validators.validateRequestId,AuthController.validateUserRoles,CourseController.updateCourseById);

//this is typically reffering to api/v1/courses/:id which will be a DELETE request
router.delete('/:id',protectRoutes,Validators.validateIdPresent,Validators.validateRequestId,AuthController.validateUserRoles,CourseController.deleteCourseById);

module.exports = router;


