const db = require('../../config/connection');

const User = function(){
	this.id;
	this.name;
	this.email;
	this.username;
	this.password;
	this.age;
	this.acess;
};

User.list = async () => {
	return new Promise(async (resolve) => {
		let query = "SELECT * FROM lfsdb.users;";
		let rows = await db(query);
		resolve(rows);
	});
};

User.findById = async (id) => {
	return new Promise(async (resolve) => {
		let query = "SELECT * FROM lfsdb.users WHERE id='"+id+"';";
		let row = await db(query);
		resolve(row);
	});
};

// User.updateAcess = function(){
// };

module.exports = User;