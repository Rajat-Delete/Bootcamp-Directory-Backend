const express = require('express');
const router = express.Router();
const {AuthController} =require('../../controllers')

//this is typically reffering to /api/v1/auth/register
router.post('/register',AuthController.registerUser);

module.exports = router;


