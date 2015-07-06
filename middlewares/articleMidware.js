var dbModule = require('../models/baseModel.js');

exports.readingNumber = function(req, res, next) {
	var visitDb = new dbModule('visit_article');
	var cols = 'ip';
	var where = {
		blog_id: req.params.blogId
	}
	visitDb.query(cols, where, null, function(ipList) {
		var flag = false;
		ipList.forEach(function(item) {
			if (item.ip === req.connection.remoteAddress)
			{
				flag = true;
				return;
			}
		})
		if (!flag) {
			var blogDb = new dbModule('blogs');
			blogDb.addOne("blog_reading_number", where, function() {
				var cols = {
					blog_id: req.params.blogId,
					ip: req.connection.remoteAddress
				}
				visitDb.insert(cols, function() {
					next();
				})
			})
		} else {
			next();
		}
	})
}

exports.likeNumber = function(req, res, next) {
	var likeDb = new dbModule('like_article');
	var cols = 'ip';
	var where = {
		blog_id: req.params.blogId
	}
	likeDb.query(cols, where, null, function(ipList) {
		var flag = false;
		ipList.forEach(function(item) {
			if (item.ip === req.connection.remoteAddress)
			{
				flag = true;
				return;
			}
		})
		if (!flag) {
			var blogDb = new dbModule('blogs');
			blogDb.addOne("blog_like_number", where, function() {
				var cols = {
					blog_id: req.params.blogId,
					ip: req.connection.remoteAddress
				}
				likeDb.insert(cols, function() {
					res.send({
						success: true
					})
				})
			})
		} else {
			res.send({
				success: false,
				msg: "Can't like more? One can only like once! Ha~Sorry~"
			})
		}
	})
}