require('dotenv').config()
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/google', 
	passport.authenticate('google', { failureRedirect: '/abc' }),
	function(req, res) {
		res.redirect('/users');
	});

router.get('/google/outgoing', passport.authenticate('google', {
	scope: ['openid profile email https://www.googleapis.com/auth/plus.login']
}));

module.exports=router;

