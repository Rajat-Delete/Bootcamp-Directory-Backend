const express = require('express');
const router = express.Router();
const {CourseController} = require('../../controllers');

//this is typically reffering to api/v1/courses which is a GET request
router.get('/',CourseController.getCourses);

//this is typically referring to 

module.exports = router;