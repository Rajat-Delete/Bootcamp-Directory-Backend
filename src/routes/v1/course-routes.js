const express = require('express');
const router = express.Router({mergeParams : true});
const {CourseController} = require('../../controllers');
const {Validators} = require('../../utils/common')


//this is typically reffering to api/v1/courses which is a GET request
router.get('/',CourseController.getCourses);

//this is typically referring to api/v1/courses/:id which is a GET request
router.get('/:id',CourseController.getCourseById);

//this is typically reffering to api/v1/courses/ which will be a POST request
router.post('/',CourseController.createCourse);

//this is typically reffering to api/v1/courses/:id which will be a PUT request
router.put('/:id',CourseController.updateCourseById);

//this is typically reffering to api/v1/courses/:id which will be a DELETE request
router.delete('/:id',CourseController.deleteCourseById);

module.exports = router;