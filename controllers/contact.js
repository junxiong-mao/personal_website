var dbModule = require('../models/baseModel.js');

exports.index = function(req, res, next) {
	var messageDb = new dbModule('message');
	var renderObj = {
		blog: '',
	  	projects: '',
	  	contact: 'active',
	  	editBlog: '',
	  	selfIntro: '',
	  	admin: req.session.admin
	}
	messageDb.query(null, null, ['order by message_date desc'], function(messageList) {
		renderObj.messageList = messageList;
		var languageDb = new dbModule('language');
		languageDb.query(null, null, null, function(languageList) {
			renderObj.languageList = languageList;
			res.render('contact', renderObj);
		})
	})
}

exports.postMessage = function(req, res, next) {
	var messageDb = new dbModule('message');
	var replyId = req.params.replyId = req.params.parentId || null;
	var cols = {
		parent_id: replyId,
		message_date: new Date(),
		ip: req.connection.remoteAddress,
		name: req.body.messageName,
		content: req.body.messageContent
	}
	messageDb.insert(cols, function() {
		res.redirect('back');
	})
}

exports.removeMessage = function(req, res, next) {
	var messageDb = new dbModule('message');
	var where = {
		id: req.params.messageId
	}
	messageDb.remove(where, function() {
		res.send({
			success: true
		})
	})
}

