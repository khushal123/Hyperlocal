var express = require('express');
var router = express.Router();
var { create, getList }
    = require("../../../../controllers/admin/discounts");


router.get("/list", getList);

router.post("/create", create);




module.exports = router;
