var express = require('express');
var router = express.Router();
var { register, login, getOrders, refreshToken, refreshDeviceId,
    getCart, saveCart, profile, updateCart,
    getOtp, verifyOtp }
    = require("../../../../controllers/app/users");


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

//save item to cart
router.post('/cart', saveCart);

//update product in cart
router.post("/cart/update", updateCart)

//list of cart 
router.get('/cart', getCart);

//list of orders
router.get('/orders', getOrders);


//get otp
router.post('/otp/get', getOtp);

//verify otp
router.post('/otp/verify', verifyOtp);


module.exports = router;
