var express = require('express');
var router = express.Router();
var productController = require('../app/controller/factory/product');

router.get('/', productController.save);

module.exports = router;