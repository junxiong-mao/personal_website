var mysql = require('mysql');

var pool = mysql.createPool({
	host: '127.0.0.1',
	port: 3306,
	user: 'root',
	password: '123456',
	database: 'personal_website'
})
	
var db = function(table) {
	this.table = table;
};

db.prototype.insert = function(cols, callback) {
	var self = this;
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log('connection err');
		} else {
			var sql = "insert into " + self.table + " set ";
			var args = [];
			var temp = '';
			for (var key in cols) {
				sql += temp + '?? = ?';
				args.push(key);
				args.push(cols[key]);
				temp = ',';
			}
			console.log(sql);
			console.log(args);
			connection.query(sql, args, function(err, result) {
				if (err) {
					console.log(err);
					return;
				} else {
					callback(result);
				}
				connection.release();
			})
		}
	})
}

db.prototype.query = function(cols, where, opt, callback) {
	var self = this;
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
		} else {
			var sql = "select " + (cols || "*") + " from " + self.table;
			var args = [];
			var temp = '';
			if (where) {
				sql += " where ";
				for (key in where) {
					sql += temp + "?? = ?";
					args.push(key);
					args.push(where[key]);
					temp = ' and '
				}
			}
			sql += (opt ? (" " + opt.join(',')) : '')
			connection.query(sql, args, function(err, result) {
				if (err) {
					console.log(err);
				} else {
					callback(result);
				}
				connection.release();
			});
		}
	})
}

db.prototype.update = function(col, where, callback) {
	var self = this;
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
		} else {
			var sql = "update " + self.table + " set ";
			var args = [];
			var temp = '';
			for (key in col) {
				sql += temp + "?? = ?";
				args.push(key);
				args.push(col[key]);
				temp = ',';
			}
			if (where) {
				sql += " where ";
				temp = '';
				for (key in where) {
					sql += temp + "?? = ?";
					args.push(key);
					args.push(where[key]);
					temp = " and ";
				}
			}
			connection.query(sql, args, function(err) {
				if (err) {
					console.log(err);
				} else {
					callback();
				}
				connection.release();
			})
		}
	})
}

db.prototype.remove = function(where, callback) {
	var self = this;
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
		} else {
			var sql = "delete from " + self.table + " where "
			var args = [];
			var temp = '';
			if (where) {
				for (key in where) {
					sql += temp + "?? = ?";
					args.push(key);
					args.push(where[key]);
					temp = " and ";
				}
			}
			connection.query(sql, args, function(err, result) {
				if (err) {
					console.log(err);
				} else {
					callback();
				}
				connection.release();
			})
		}
	})
}

db.prototype.addOne = function(col, where, callback) {
	var self = this;
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
		} else {
			var sql = "update " + self.table + " set " + col + " = " + col + " + 1 ";
			var args = [];
			var temp = '';
			if (where) {
				sql += 'where '
				for (key in where) {
					sql += temp + "?? = ?";
					args.push(key);
					args.push(where[key]);
					temp = " and ";
				}
			}
			console.log(sql);
			console.log(args);
			connection.query(sql, args, function(err) {
				if (err) {
					console.log(err);
				} else {
					callback();
				}
				connection.release();
			})
		}
	})
};

module.exports = db;