var dbModule = require('../models/baseModel.js');

exports.showLogin = function(req, res, next) {
	if (req.session.admin) {
		res.redirect('/');
	}
	var renderObj = {
		blog: '',
	  	projects: '',
	  	contact: '',
	  	editBlog: '',
	  	selfIntro: '',
	  	admin: req.session.admin
	}
	res.render('login', renderObj);
}

exports.login = function(req, res, next) {
	var userDb = new dbModule('super_user');
	userDb.query(null, {username: req.body.user}, null, function(userInfo) {
		if (userInfo[0])
		{
			req.session.admin = true;
			res.redirect('/');
		} else {
			res.send({
				msg: 'Wrong username or password for admin!'
			});
		}
	})
}

exports.logout = function(req, res, next) {
	req.session.destroy(function(err) {
		if (err) {
			console.log(err);
		}
		else {
			res.redirect('/');
		}
	})
}