$(function(){
	$("#product-save-btn").on('click', function(){
		let cod = document.getElementById('product_cod').value;
		let name = document.getElementById('product_name').value;
		let type = document.getElementById('product_type').value;
		let color = document.getElementById('product_color').value;
		let size = document.getElementById('product_size').value;

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
				if(response.msg){
					alert(response.msg);
					document.getElementById("product-save-btn").disabled = false;
					return;
				};

				alert(response.done);
				let cod = document.getElementById('product_cod').value = "";
				let name = document.getElementById('product_name').value = "";
				let type = document.getElementById('product_type').value = "";
				let color = document.getElementById('product_color').value = "";
				let size = document.getElementById('product_size').value = "";
			}
		});
	});
});