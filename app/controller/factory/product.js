const User = require('../user');
const Product = require('../../model/product');

const productController = {
	save: async (req, res) => {
		if(!await User.verifyAcess(req, res, ['a1'])){
			return res.redirect('/login');
		};
		return res.redirect('/');
	}
};

module.exports = productController;