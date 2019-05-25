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

User.list = () => {
	let query = "SELECT * FROM lfsdb.users;";
	return db(query);
};

User.findById = (id) => {
	let query = "SELECT * FROM lfsdb.users WHERE id='"+id+"';";
	return db(query);
};

User.updateAcess = (user) => {
	let query = "UPDATE lfsdb.users SET acess='"+user.newAcess+"' WHERE id='"+user.id+"';";
	return db(query);
};

module.exports = User;