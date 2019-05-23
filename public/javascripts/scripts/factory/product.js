$(function(){
	$("#product-save-btn").on('click', function(){
		document.getElementById("product-save-btn").disabled = true;
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
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
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
				document.getElementById("product-save-btn").disabled = false;
			}
		});
	});

	$("#product-filter-btn").on('click', function(){
		document.getElementById("product-filter-btn").disabled = true;
		let type = document.getElementById('src_product_type').value;
		let color = document.getElementById('src_product_color').value;

		$.ajax({
			url: '/factory/product/filter',
			method: 'post',
			data: { 
				product_type: type,
				product_color: color
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};
				
				if(response.msg){
					alert(response.msg);
					document.getElementById('main-product-tbody').innerHTML = "";
					document.getElementById("product-filter-btn").disabled = false;
					return;
				};

				document.getElementById('main-product-tbody').innerHTML = "";
				let html = "";
				response.products.forEach((product) => {
					html += "<tr>";
					html += "<td id='src_product_cod' hidden>"+product.cod+"</td>";
					html += "<td><a id='product-show-btn'>"+product.cod+"</a></td>";
					html += "<td>"+product.type+"</td>";
					html += "<td>"+product.name+"</td>";
					html += "<td>"+product.size+"</td>";
					html += "<td>"+product.color+"</td>";
					html += "</tr>";
				});
				document.getElementById('main-product-tbody').innerHTML = html;
				document.getElementById("product-filter-btn").disabled = false;
			}
		});
	});

	$('table').on('click', '#product-show-btn', function(){
		var rowEl = $(this).closest('tr');
		var cod = rowEl.find('#src_product_cod').text();

		$.ajax({
			url: '/factory/product/show',
			method: 'post',
			data: { 
				product_cod: cod
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				document.getElementById('show-product-box').innerHTML = "";
				let html = "<h5>Dados do produto "+response.product[0].type+" "+response.product[0].name+" "+response.product[0].size+" "+response.product[0].color+"</h5><br>";
				html += "<table>";
				html += "<tr>";
				html += "<td>Id</td><td>Cód</td><td>Tipo</td><td>Nome</td><td>Tamanho</td><td>Cor</td><td>Qtd</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td>"+response.product[0].id+"</td>";
				html += "<td>"+response.product[0].cod+"</td>";
				html += "<td>"+response.product[0].type+"</td>";
				html += "<td>"+response.product[0].name+"</td>";
				html += "<td>"+response.product[0].size+"</td>";
				html += "<td>"+response.product[0].color+"</td>";
				html += "<td>"+response.product[0].amount+"</td>";
				html += "</tr>";
				html += "</table>";
				document.getElementById('show-product-box').innerHTML = html;
				document.getElementById('show-product-box').style.visibility = 'visible';
			}
		});
	});
});