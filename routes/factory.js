const express = require('express');
const router = express.Router();
const userController = require('../app/controller/user');
const productController = require('../app/controller/factory/product');

router.get('/', userController.verify, (req, res) => {
	res.render('factory/index');
});

router.get('/product', productController.index);
router.post('/product/save', productController.save);

module.exports = router;