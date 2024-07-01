const express = require('express');
const router = express.Router();
const {BootcampController, AuthController} = require('../../controllers');
const {Validators } =require('../../utils/common');
const CourseRouter = require('./course-routes');
const { protectRoutes } = require('../../middlewares/auth-middleware');

//this is typically reffering to /api/v1/bootcamps which is a GET Request
router.get('/',BootcampController.getBootcamps);

//this will be typically reffering to /api/v1/bootcamps/:bootcampId/courses
router.use('/:id/courses',CourseRouter);

//this is typically reffering to /api/v1/bootcamps/:id which is a GET Request
router.get('/:id',Validators.validateRequestId,BootcampController.getBootcampById);

//this is typically reffering to /api/v1/bootcamps/ which is a POST Request
router.post('/',protectRoutes,AuthController.validateUserRoles,BootcampController.createBootcamp);

//this is typically reffering to /api/v1/bootcamps/:id which is a PUT Request
router.put('/:id',protectRoutes,Validators.validateRequestId,AuthController.validateUserRoles,BootcampController.updateBootcampById);

//this is typically reffering to /api/v1/bootcamps/:id which is a DELETE Request
router.delete('/:id',protectRoutes,Validators.validateRequestId,AuthController.validateUserRoles,BootcampController.deleteBootcampById);

//this is typically reffering to /api/v1/bootcamps/radius/:zipcode/:distance
router.get('/radius/:zipcode/:distance',protectRoutes,AuthController.validateUserRoles,BootcampController.getBootcampWithinRadius);

//this is typically reffering to /api/v1/bootcamps/:id/photo
router.put('/:id/photo',Validators.validateRequestId,protectRoutes,AuthController.validateUserRoles,BootcampController.uploadBootcampPhoto);


module.exports = router;