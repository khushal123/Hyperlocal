var express = require('express');
var router = express.Router();
var { register, login, getOrders, refreshToken, refreshDeviceId, profile }
    = require("../../../../controllers/delivery/users");


//profile
router.get('/profile', profile);


//login
router.post('/login', login);

//register
router.post('/register', register);

//refresh token
router.post("/refreshToken", refreshToken);

//refresh device id
router.post("/refreshDeviceId", refreshDeviceId);

//list of orders
router.get('/orders', getOrders);


//get top
// router.post('/otp/get', getOtp);

//verify top
// router.post('/otp/verify', verifyOtp);




module.exports = router;
