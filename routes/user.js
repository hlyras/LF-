const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const userController = require('../app/controller/user');

router.get('/', userController.verify, userController.index);
router.get('/login', userController.login);
router.get('/signup', userController.signup);
router.get('/logout', userController.logout);

router.post('/login', passport.authenticate('local-login', { 
	failureRedirect: '/user/login',
	failureFlash: true
}),(req, res) => {
	if (!req.body.remember) {
		req.session.cookie.maxAge = 1000 * 60 * 5;
	} else {
		req.session.cookie.expires = false;
	};
	res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', { 
	failureRedirect: '/user/signup',
	failureFlash: true 
}),(req, res) => {
	req.session.cookie.maxAge = 1000 * 60 * 5;
	res.redirect('/');
});

module.exports = router;