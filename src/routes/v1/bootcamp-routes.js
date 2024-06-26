const express = require('express');
const router = express.Router();
const {BootcampController} = require('../../controllers');
const {Validators } =require('../../utils/common');
const CourseRouter = require('./course-routes');

//this is typically reffering to /api/v1/bootcamps which is a GET Request
router.get('/',BootcampController.getBootcamps);

//this will be typically reffering to /api/v1/bootcamps/:bootcampId/courses
router.use('/:id/courses',CourseRouter);

//this is typically reffering to /api/v1/bootcamps/:id which is a GET Request
router.get('/:id',Validators.validateRequestId,BootcampController.getBootcampById);

//this is typically reffering to /api/v1/bootcamps/ which is a POST Request
router.post('/',BootcampController.createBootcamp);

//this is typically reffering to /api/v1/bootcamps/:id which is a PUT Request
router.put('/:id',Validators.validateRequestId,BootcampController.updateBootcampById);

//this is typically reffering to /api/v1/bootcamps/:id which is a DELETE Request
router.delete('/:id',Validators.validateRequestId,BootcampController.deleteBootcampById);

//this is typically reffering to /api/v1/bootcamps/radius/:zipcode/:distance
router.get('/radius/:zipcode/:distance',BootcampController.getBootcampWithinRadius);

//this is typically reffering to /api/v1/bootcamps/:id/photo
router.put('/:id/photo',Validators.validateRequestId,BootcampController.uploadBootcampPhoto);


module.exports = router;