var express = require('express');
var router = express.Router();
var {  }
    = require("../../../../controllers/app/");



//register
router.get('/list', register);

//login
router.get('/list/home', login);



module.exports = router;
