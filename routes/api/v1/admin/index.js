var express = require("express");
var router = express.Router();

var users = require("./users");
var orders = require("./orders");
var kitchens = require("./kitchens");
router.use("/users", users);
router.use("/orders", orders);
router.use("/kitchens", kitchens);

module.exports = router;