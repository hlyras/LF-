$(function(){
	$("#product-save-btn").on('click', function(){
		let cod = document.getElementById('product_cod').value;
		let name = document.getElementById('product_name').value;
		let type = document.getElementById('product_type').value;
		let color = document.getElementById('product_color').value;
		let size = document.getElementById('product_size').value;

		if(!cod || cod < 1 || cod > 9999){return alert('Código de produto inválido.')};
		if(!name){return alert('Preencha o nome do produto.')};
		if(!type){return alert('Preencha o tipo do produto.')};
		if(!color){return alert('Preencha a cor do produto.')};
		if(!size){return alert('Preencha o tamanho do produto.')};

		$.ajax({
			url: '/factory/product/save',
			method: 'post',
			data: { 
				product_cod: cod,
				product_name: name,
				product_type: type,
				product_color: color,
				product_size: size
			},
			success: function(response){
				console.log(response.user);
				response.user.forEach((usr)=>{
					console.log(usr);
				})
			}
		});
	});
});