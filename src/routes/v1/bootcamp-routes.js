const express = require('express');
const router = express.Router();
const {BootcampController} = require('../../controllers');

//this is typically reffering to /api/v1/bootcamps which is a GET Request
router.get('/',BootcampController.getBootcamps);

//this is typically reffering to /api/v1/bootcamps/:id which is a GET Request
router.get('/:id',BootcampController.getBootcampById);

//this is typically reffering to /api/v1/bootcamps/:id which is a POST Request
router.post('/',BootcampController.updateBootcampById);

//this is typically reffering to /api/v1/bootcamps/:id which is a PUT Request
router.put('/:id',BootcampController.updateBootcampById);

//this is typically reffering to /api/v1/bootcamps/:id which is a DELETE Request
router.delete('/:id',BootcampController.deleteBootcampById);


module.exports = router;