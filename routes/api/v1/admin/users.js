var express = require('express');
var router = express.Router();
var { register, login, getOrders, refreshToken, refreshDeviceId, getCart, saveCart, profile }
    = require("../../../../controllers/admin/users");


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







module.exports = router;
