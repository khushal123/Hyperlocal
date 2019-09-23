var express = require('express');
var router = express.Router();


router.get("/:id", function (req, res, next) {
});

// router.get("/kitchens/:id/", )

router.post('/save-single', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/save-cart', function (req, res, next) {
    res.send('respond with a resource');
});










module.exports = router;
