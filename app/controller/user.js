const userController = {
	index: (req, res) => {
		res.render('user/profile', { user: req.user });
	},
	verify: (req, res, next) => {
		if (req.isAuthenticated()){
			return next();
		};
		res.redirect('/user/login');
	},
	login: (req, res) => {
		res.render('user/login', { message: req.flash('loginMessage') });
	},
	signup: (req, res) => {
		res.render('user/signup', { message: req.flash('signupMessage') });
	},
	logout: (req, res) => {
		req.logout();
		res.redirect('/');
	}
};

module.exports = userController;