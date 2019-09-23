var express = require('express');
var router = express.Router();

var { save } = require("../../../../controllers/app/payments")

// router.get("/:id");
router.post('/save', save);

module.exports = router;
