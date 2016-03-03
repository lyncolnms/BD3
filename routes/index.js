var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../usuario.js');

/* GET home page. */

var auth = function(req, res, next) { 
  if (req.isAuthenticated()) { 
	  return next(); 
  }
  res.redirect('/login');
};

router.get('/', function(req, res) {
	res.redirect('/users');
});

router.get('/users', auth, function(req, res, next) {
	User.findAll(function(err, data) {
		if(err)
			res.send(err);
		else 
			res.render('usuarios/index', {users: data});
			// res.send(data);
	});
});

router.get('/usuario/novo', function(req, res, next) {

});

router.get('/login', function(req, res, next) {
	console.log(req.user);
	if(req.isAuthenticated())
		res.redirect('/');
	else
		res.render('login');
});

router.post('/login', 
	passport.authenticate('local'),
	function(req, res) {
		res.redirect('/');
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});



module.exports = router;