const userController = require('./user');

const adminController = {
	index: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['p1','dv'])){
			return res.redirect('/login');
		};
		res.render('admin/index');
	}
}

module.exports = adminController;