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
	}
};

module.exports = userController;