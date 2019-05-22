const db = require('../../config/connection');

const Product = function(){
	this.id;
	this.name;
	this.type;
	this.color;
	this.size;
	this.amount = 0;
	this.pictures = [];
};

console.log(db);

Product.save = function(product){
	return new Promise((resolve, reject) => {
		try {
			let query = "INSERT INTO lfsdb.users (name, type, color, size) VALUES ('"+product.name+"','"+product.type+"','"+product.color+"','"+product.size+"');";
			let user = await db(query);
			resolve(user);
		} catch (err){
			reject(err);
		};
	});
};

module.exports = Product;