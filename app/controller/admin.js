const userController = require('./user');
const User = require('../model/user');

const adminController = {
	index: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['p1','dv'])){
			return res.redirect('/login');
		};
		res.render('admin/index');
	},
	updateAcess: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['p1','dv'])){
			return res.redirect('/login');
		};
		let user = {
			id: req.body.user_id,
			newAcess: req.body.user_newAcess,
		};

		var row = await User.findById(user.id);
		if(row[0].acess=='p1' || row[0].acess=='dv' || row[0].acess=='s1'){
			return res.send({ msg: 'Você não tem permissão para alterar os privilégios deste usuário.' })
		};

		if(!await User.updateAcess(user)){
			return res.send({ err: 'Ocorreu um erro, favor contatar o suporte'});
		};
		res.send({ done: "Privilégio atualizado com sucesso." })
	}
};

module.exports = adminController;