var dbModule = require('../models/baseModel.js');
var lib = require('../lib/lib.js')

exports.createNew = function(req, res, next)
{
	if (!req.session.admin)
	{
		res.redirect('/login');
	}
	var renderObj = {
		blog: '', 
	  	projects: '',
	  	contact: '',
	  	editBlog: 'active',
	  	selfIntro: '',
	  	admin: req.session.admin,
	  	edit: false
	}

	blogDb = new dbModule('blogs');
	
	blogDb.query('category', null, null, function(result) {
		var arr = [];
		result.forEach(function(obj) {
			arr.push(obj.category);
		})
		renderObj.category = arr.removeDuplicate();
		var languageDb = new dbModule('language');
		languageDb.query(null, null, null, function(languageList) {
			renderObj.languageList = languageList;
			res.render('edit', renderObj);
		})
	})
}

exports.edit = function(req, res, next) {
	if (!req.session.admin) {
		res.redirect('/login');
	}
	var renderObj = {
		blog: '', 
	  	projects: '', 
	  	contact: '',
	  	selfIntro: '',
	  	editBlog: 'active',
	  	admin: req.session.admin,
	  	edit: true
	}
	var blogDb = new dbModule('blogs');
	var where = {
		blog_id: req.params.blogId
	}
	blogDb.query(null, where, null, function(article) {
		renderObj.article = article;
		blogDb.query('category', null, null, function(result) {
			var arr = [];
			result.forEach(function(obj) {
				arr.push(obj.category);
			})
			renderObj.category = arr.removeDuplicate();
			var languageDb = new dbModule('language');
			languageDb.query(null, null, null, function(languageList) {
				renderObj.languageList = languageList;
				res.render('edit', renderObj);
			})
		})
	})
}

exports.postEdit = function(req, res, next) {
	blogDb = new dbModule('blogs');
	var date = new Date();
	var cols = {
		blog_time: date,
		blog_title: req.body.title,
		blog_content:  req.body.content,
		blog_author:  req.body.author,
		category:  req.body.category
	}
	var where = {
		blog_id: req.params.blogId
	}
	blogDb.update(cols, where, function() {
		res.redirect('/blogs/article/' + req.params.blogId);
	})
}

exports.postNew = function(req, res, next) {
	blogDb = new dbModule('blogs');
	var cols = {
		blog_time: new Date(),
		blog_title: req.body.title,
		blog_content: req.body.content,
		blog_author: req.body.author,
		category: req.body.category
	}
	blogDb.insert(cols, function() {
		res.redirect('/');
	})
}