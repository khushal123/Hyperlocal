var express = require("express");
var router = express.Router();

var users = require("./users");
var orders = require("./orders");
router.use("/users", users);
router.use("/orders", orders);

module.exports = router;