const userController = require('../user');
const Product = require('../../model/factory/product');

const productController = {
	index: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['a1'])){
			return res.redirect('/login');
		};
		res.render('factory/product/index');
	},
	save: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['a1'])){
			return res.redirect('/login');
		};

		const product = {
			cod: parseInt(req.body.product_cod),
			name: req.body.product_name,
			type: req.body.product_type,
			color: req.body.product_color,
			size: req.body.product_size
		};

		let row = await Product.save(product);
		let user = await Product.findById(row.insertId);
		res.send({ user: user });
	},
	list: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['a1'])){
			return res.redirect('/login');
		};

		let users = Product.list();
		res.send({ users: users });	
	}
};

module.exports = productController;