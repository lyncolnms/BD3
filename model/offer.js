
var db = require('../database');

module.exports = {

	findAll: function(callback) {
		db.pool.getConnection(function(err, conn) {
			if (err)
				callback(err, null);
			else {
				conn.query('SELECT * FROM offers ORDER BY dueDate ASC', function(err, data){
					if(err)
						callback(err, null);
					else {
						callback(null, data);
					}
					conn.release();
				});
			}
		});
	},

	findById: function(id, callback) {
		db.pool.getConnection(function(err, conn) {
			if (err)
				callback({msg: 'Erro de conexão', error: err}, null);
			else {
				conn.query('SELECT * FROM offers WHERE id = ' + id, function(err, data){
					if(err)
						callback({msg: 'Erro de consulta', error: err}, null);
					else {
						if(data.length == 1)
							callback(null, data[0]);
						else
							callback({msg: 'Oferta não existente', error: '404'}, null);
					}
					conn.release();
				});
			}
		});
	}
}

