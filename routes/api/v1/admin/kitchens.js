var express = require('express');
var router = express.Router();
var { create, update } = require("../../../../controllers/admin/kitchens");

router.get("/list", );



router.post('/create', create);

router.put('/:id', update);










module.exports = router;
