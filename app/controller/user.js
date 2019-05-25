const User = require('../model/user');

const userController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	verify: (req, res, next) => {
		if (req.isAuthenticated()){ return next() };
		res.redirect('/login');
	},
	verifyAcess: async (req, res, acess) => {
		if(req.isAuthenticated()){
			for(let i in acess){
				if(acess[i]==req.user.acess){
					return true;
				};
			};
		};
		return false;
	},
	login: (req, res) => {
		req.session.cookie.maxAge = 1000 * 60 * 30;
		res.redirect('/');
	},
	signup: (req, res) => {
		req.session.cookie.maxAge = 1000 * 60 * 30;
		res.redirect('/');
	},
	list: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['p1','g1','dv'])){
			return res.send({ unauthorized: "Usuário não autorizado."});
		};
		let users = await User.list();
		res.send({ users: users });
	},
	show: async (req, res) => {
		if(!await userController.verifyAcess(req, res, ['p1','g1','dv'])){
			return res.send({ unauthorized: "Usuário não autorizado."});
		};
		let user = await User.findById(req.body.user_id);
		res.send({ user: user });
	}
};

module.exports = userController;