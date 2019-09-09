var express = require('express');
var router = express.Router();
var { register, login, getOrders, refreshToken, refreshDeviceId, getCart, saveCart, profile } 
= require("../../../../controllers/users");


//profile
router.get('/profile', profile);


//login
router.post('/login', login);

//register
router.post('/register', register);

//save item to cart
router.post('/cart', saveCart);

//list of cart 
router.get('/cart', getCart);

//refresh token
router.post("/refreshToken", refreshToken);

//refresh device id
router.post("/refreshDeviceId", refreshDeviceId);


//list of orders
router.get('/orders', getOrders);





module.exports = router;
