const db = require('../../../config/connection');

const Product = function(){
	this.id;
	this.name;
	this.type;
	this.color;
	this.size;
	this.amount = 0;
	this.pictures = [];
};

Product.save = async (product) => {
	return new Promise(async (resolve) => {
		let query = "INSERT INTO lfsdb.products (cod, name, type, color, size) VALUES ('"
			+product.cod+"', '"
			+product.name+"','"
			+product.type+"','"
			+product.color+"','"
			+product.size+"');";

		let row = await db(query);
		resolve(row);
	});
};

Product.list = async () => {
	return new Promise(async (resolve) => {
		let query = "SELECT * FROM lfsdb.products;";
		let rows = await db(query);
		resolve(rows);
	});
};

Product.findById = async (id) => {
	return new Promise(async (resolve) => {
		let query = "SELECT * FROM lfsdb.products WHERE id='"+id+"';";
		let row = await db(query);
		resolve(row);
	});
};

Product.findByCod = async (cod) => {
	return new Promise(async (resolve) => {
		let query = "SELECT * FROM lfsdb.products WHERE cod='"+cod+"';";
		let row = await db(query);
		resolve(row);
	});
};

Product.filter = async (product) => {
	return new Promise(async (resolve) => {
		if(product.type && product.color){
			var query = "SELECT * FROM lfsdb.products WHERE type='"+product.type+"' AND color='"+product.color+"' ORDER BY cod ASC;";
		} else if(product.type && !product.color){
			var query = "SELECT * FROM lfsdb.products WHERE type='"+product.type+"' ORDER BY cod ASC;";
		} else if(!product.type && product.color){
			var query = "SELECT * FROM lfsdb.products WHERE color='"+product.color+"' ORDER BY cod ASC;";
		} else if(!product.type && !product.color){
			var query = "SELECT * FROM lfsdb.products ORDER BY cod ASC;";
		};

		let rows = await db(query);
		resolve(rows);
	});
};

module.exports = Product;