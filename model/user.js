var db = require('../database');

var User = function(data, pass) {
	this.id = data.id;
	this.username = data.username;
	this.role = data.role;
	this.validPassword = function() {
		if(data.password == pass) {
			return true;
		} else {
			return false;
		}
	};
};

/*User.findAll = function(callback) {
	var q = 'SELECT * FROM usuario';
	db(q, function(err, data) {
		if(err)
			callback(err, null);
		else
			callback(null, {data: data, query: q});
	});
};

User.insert = function(user, password, callback) {
	var q = "INSERT INTO usuario (usuario, senha) VALUES ('" + user + "','" + password + "')";
	db(q, function(err, data) {
		if(err)
			callback(err, null);
		else
			callback(null, {data: data, query: q});
	});
};*/

User.findOne = function(data, callback) {
	db.pool.getConnection(function(err, conn) {
		if (err)
			callback(err, null);
		else {
			conn.query('SELECT * FROM users WHERE username = \'' + data.username + '\'', function(err, rows){
				if(err)
					callback(err, null);
				else {
					if(rows.length == 1) {
						var user = new User(rows[0], data.password);
						console.log(user);
						callback(null, user);
					} else {
						callback(null, null);
					}
				}
				conn.release();
			});
		}
	});
};

User.findById = function(id, callback) {
	db.pool.getConnection(function(err, conn) {
		if (err)
			callback(err, null);
		else {
			conn.query('SELECT * FROM users WHERE id = ' + id, function(err, rows){
				var user = new User(rows[0]);
				callback(err, user);
				conn.release();
			});
		}
	});
};

module.exports = User;

