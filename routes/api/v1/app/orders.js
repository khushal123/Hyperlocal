var express = require('express');
var router = express.Router();

var { saveCart, saveSingle, getOrder } = require("../../../../controllers/app/orders")

router.get("/:id", getOrder);

router.post('/checkout-single', saveSingle);

router.post('/checkout-cart', saveCart);

module.exports = router;
