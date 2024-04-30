const express = require('express');
const router = express.Router();

//this is typically reffering to /api/v1/bootcamps which is a GET Request
router.get('/',(request,response)=>{
    response.status(200).json({'Success' : true , 'Data' : 'hey' });
});

//this is typically reffering to /api/v1/bootcamps/:id which is a GET Request
router.get('/:id');

//this is typically reffering to /api/v1/bootcamps/:id which is a POST Request
router.post('/');

//this is typically reffering to /api/v1/bootcamps/:id which is a PUT Request
router.put('/:id');

//this is typically reffering to /api/v1/bootcamps/:id which is a DELETE Request
router.delete('/:id');


module.exports = router;