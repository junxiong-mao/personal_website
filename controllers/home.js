var dbModule = require('../models/baseModel.js');
var lib = require('../lib/lib.js');
var db = new dbModule('blogs');

exports.index = function(req, res, next) {
	var renderObj = {
		blog: 'active', 
		projects: '', 
		contact: '',
		editBlog: '',
		selfIntro: '',
		admin: req.session.admin,
	};
	db.query(null, null, ['order by blog_time desc'], function(blogsArray) {
		renderObj.blogsArray = blogsArray;
		var cols = ['blog_title', 'blog_reading_number', 'blog_id'].join(',');
		db.query(cols, null, ['order by blog_reading_number desc'], function(hotList) {
			renderObj.hotList = hotList;
			var cols = ['blog_title', 'blog_like_number', 'blog_id'].join(',');
			db.query(cols, null, ['order by blog_like_number desc'], function(likeList) {
				renderObj.likeList = likeList;
				db.query('category', null, null, function(result) {
					var arr = [];
					result.forEach(function(obj) {
						arr.push(obj.category);
					})
					renderObj.categoryList = arr.getDuplicity();
					res.render('blogs', renderObj);
				})
				
			})
		})
	})
}