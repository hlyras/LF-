var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

const db = async (query) => {
	connection.query('USE ' + dbconfig.database);
	return new Promise((resolve, reject) => {
		connection.query(query, (err, rows) => {
			if(!err){
				resolve(rows);
			} else {
				reject(err);
			};
		});
	});
};

module.exports = db;