var db = require('./database.js');

var User = function(data, pass) {
	this.id = data.id;
	this.usuario = data.usuario;
	this.tipo = data.tipo;
	this.validPassword = function() {
		if(data.senha == pass) {
			return true;
		} else {
			return false;
		}
	};
};

User.findAll = function(callback) {
	var q = 'SELECT * FROM usuarios';
	db(q, function(err, data) {
		if(err)
			callback(err, null);
		else
			callback(null, data);
	});
};

User.insert = function(user, password, callback) {
	var q = "INSERT INTO usuarios (usuario, senha) VALUES ('" + user + "','" + password + "')";
	db(q, function(err, data) {
		if(err)
			callback(err, null);
		else
			callback(null, data);
	});
};

User.findOne = function(data, callback) {
	db("SELECT * FROM usuarios WHERE usuario = '" + data.username + "'", function(err, rows) {
		if(err)
			callback(err, null)
		else if(!rows.length)
			callback(null, null);
		else {
			var user = new User(rows[0], data.password)
			callback(null, user);
		}
	});
};

User.findById = function(id, callback) {
	db("SELECT * FROM usuarios WHERE id = " + id, function(err, data) {
		if(err)
			callback(err, null)
		else {
			var user = new User(data[0]);
			callback(err, user);
		}
	});
};

module.exports = User;