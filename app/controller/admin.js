const userController = require('./user');
const User = require('../model/user');
const Jobs = require('../model/job');

const adminController = {
	index: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['prp','dvp'])){
			return res.redirect('/login');
		};
		res.render('admin/index');
	},
	updateAcess: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['prp','dvp'])){
			return res.redirect('/login');
		};
		let user = {
			id: req.body.user_id,
			newAcess: req.body.user_newAcess,
			newJob: undefined
		};

		var row = await User.findById(user.id);
		if(row[0].acess=='prp' || row[0].acess=='dvp'){
			return res.send({ msg: 'Você não tem permissão para alterar os privilégios deste usuário.' })
		};

		for(i in Jobs){
			if(Jobs[i].code==user.newAcess){
				user.newJob = Jobs[i].name;
			};
		};

		if(!await User.updateAcess(user)){
			return res.send({ err: 'Ocorreu um erro, favor contatar o suporte'});
		};

		res.send({ done: "Privilégio atualizado com sucesso." });
	}
};

module.exports = adminController;