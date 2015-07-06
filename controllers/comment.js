var dbModule = require('../models/baseModel.js');

exports.postBlogComment = function(req, res, next) {
	var commentDb = new dbModule('blog_comment');
	var parentId = req.params.parentId === 'null' ? null : req.params.parentId;
	var date = new Date();
	var obj = {
		parent_id: parentId,
		ip: req.connection.remoteAddress,
		name: req.body.blogCommentName,
		content: req.body.blogComment,
		blog_id: req.params.blogId,
		comment_time: date
	}
	commentDb.insert(obj, function() {
		res.redirect('back');
	})
}

exports.removeBlogComment = function(req, res, next) {
	var commentDb = new dbModule('blog_comment');
	var where = {
		id: req.params.commentId
	}
	commentDb.remove(where, function() {
		res.send({
			success: true
		})
	})
}