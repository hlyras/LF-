const db = require('../../config/connection');

const User = function(){
	this.id;
	this.name;
	this.email;
	this.username;
	this.password;
	this.birth;
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

User.findByUsername = (user) => {
	let query = "SELECT * FROM lfsdb.users WHERE username='"+user.username+"';";
	return db(query);
};

User.findByEmail = (user) => {
	let query = "SELECT * FROM lfsdb.users WHERE email='"+user.email+"';";
	return db(query);
};

User.updateAcess = (user) => {
	let query = "UPDATE lfsdb.users SET acess='"+user.newAcess+"', job='"+user.newJob+"' WHERE id='"+user.id+"';";
	return db(query);
};

User.updateInfo = (user) => {
	if(user.email && user.birth){
		var query = "UPDATE lfsdb.users SET email='"+user.email+"', birth='"+user.birth+"' WHERE id='"+user.id+"';";
	} else if(user.email && !user.birth){
		var query = "UPDATE lfsdb.users SET email='"+user.email+"' WHERE id='"+user.id+"';";
	} else if(!user.email && user.birth){
		var query = "UPDATE lfsdb.users SET birth='"+user.birth+"' WHERE id='"+user.id+"';";
	};
	return db(query);
};

module.exports = User;