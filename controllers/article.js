var dbModule = require('../models/baseModel.js');
var lib = require('../lib/lib.js')
exports.index = function(req, res, next) {
	var renderObj = {
		blog: '', 
	  	projects: '', 
	  	contact: '',
	  	editBlog: 'active',
	  	selfIntro: '',
	  	admin: req.session.admin
	};
	var blogDb = new dbModule('blogs');
	var where = {
		blog_id: req.params.blogId,
	};
	blogDb.query(null, where, null, function(article) {
		renderObj.article = article;
		var commentsDb = new dbModule('blog_comment');
		commentsDb.query(null, where, null, function(comments) {
			renderObj.comments = comments;
			var cols = ['blog_title', 'blog_like_number', 'blog_id'].join(',');
			blogDb.query(cols, null, ['order by blog_like_number desc'], function(likeList) {
				renderObj.likeList = likeList;
				var cols = ['blog_title', 'blog_reading_number', 'blog_id'].join(',');
				blogDb.query(cols, null, ['order by blog_reading_number desc'], function(hotList) {
					renderObj.hotList = hotList;
					blogDb.query('category', null, null, function(result) {
						var arr = [];
						result.forEach(function(obj) {
							arr.push(obj.category);
						})
						renderObj.categoryList = arr.getDuplicity();
						var languageDb = new dbModule('language');
						languageDb.query(null, null, null, function(languageList) {
							renderObj.languageList = languageList;
							res.render('article', renderObj);
						})
					})
				})
			})
		})
	})
}

exports.removeArticle = function(req, res, next) {
	removeFunc(req, res, next, false);
}

exports.removeArticleRed = function(req, res, next) {
	removeFunc(req, res, next, true);
}

function removeFunc(req, res, next, red) {
	var blogDb = new dbModule('blogs');
	var obj = {
		blog_id: req.params.blogId
	}
	blogDb.remove(obj, function() {
		var commentsDb = new dbModule('blog_comment');
		var obj = {
			id: req.params.blogId
		}
		commentsDb.remove(obj, function() {
			if (red) {
				res.send({
					success: true
				})
			} else {
				res.send({
					success: true
				})
			}
		})
	})
}