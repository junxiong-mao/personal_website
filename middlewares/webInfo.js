var dbModule = require('../models/baseModel.js');

exports.ipCheck = function(req, res, next) {
	ipDb = new dbModule('visitor');
	var where = {
		'ip': req.connection.remoteAddress
	}
	ipDb.query('ip', where, null, function(list) {
		if (list.length) {
			var cols = {
				'time': new Date()
			}
			var where = {
				'ip': req.connection.remoteAddress
			}
			ipDb.update(cols, where, function() {
				next();
			})
		} else {
			var cols = {
				'ip': req.connection.remoteAddress,
				'time': new Date()
			}
			ipDb.insert(cols, function() {
				var webInfoDb = new dbModule('website_info');
				webInfoDb.addOne('visitor', null, function() {
					next();
				})
			})
		}
	})
}

exports.visitorNum = function(req, res, next) {
	var webInfoDb = new dbModule('website_info');
	webInfoDb.query(null, null, null, function(result) {
		res.send(result);
	})
}