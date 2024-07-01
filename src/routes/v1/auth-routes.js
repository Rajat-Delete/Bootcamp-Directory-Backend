const express = require('express');
const router = express.Router();
const {AuthController} =require('../../controllers');
const { protectRoutes } = require('../../middlewares/auth-middleware');

//this is typically reffering to /api/v1/auth/register
router.post('/register',AuthController.registerUser);

router.post('/sigin',AuthController.signInUser);

router.get('/me',protectRoutes, AuthController.getCurrentLoggedInUser);

module.exports = router;


