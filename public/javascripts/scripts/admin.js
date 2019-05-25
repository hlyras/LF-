$(function(){
	$("#user-list-btn").on('click', function(){
		document.getElementById("user-list-btn").disabled = true;
		$.ajax({
			url: '/user/list',
			method: 'get',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				let pageSize = 5;
				let page = 0;
				let users = response.users;

				function paging(){
					html = "<table><tr><td>Id</td><td>Nome</td><td>E-mail</td><td>Username</td><td>Acesso</td></tr>";
					if(users.length){
					    for (let i = page * pageSize; i < users.length && i < (page + 1) * pageSize;i++){
							html += "<tr>";
							html += "<td id='src_user_id' hidden>"+users[i].id+"</td>";
							html += "<td><a id='user-show-btn'>"+users[i].id+"</a></td>";
							html += "<td>"+users[i].name+"</td>";
							html += "<td>"+users[i].email+"</td>";
							html += "<td>"+users[i].username+"</td>";
							html += "<td>"+users[i].acess+"</td>";
							html += "<td><a id='user-select-btn'>Alterar</a></td>";
							html += "</tr>";
						};
						html += "</table>";
						document.getElementById('main-user-tbl').innerHTML = html;
						document.getElementById('main-user-div').style.display = 'block';
					} else {
						alert('Nenhum usuário encontrado.');
						document.getElementById('main-user-tbl').innerHTML = html;
						document.getElementById('main-user-div').style.display = 'none';
					};
				    $('#userPageNumber').text('' + (page + 1) + ' de ' + Math.ceil(users.length / pageSize));
				};

				document.getElementById("user-list-btn").disabled = false;

				function saleButtonsPaging(){
				    $('#userNext').prop('disabled', users.length <= pageSize || page >= users.length / pageSize - 1);
				    $('#userPrevious').prop('disabled', users.length <= pageSize || page == 0);
				};

				$(function(){
				    $('#userNext').click(function(){
				        if(page < users.length / pageSize - 1){
				            page++;
				            paging();
				            saleButtonsPaging();
				        };
				    });
				    $('#userPrevious').click(function(){
				        if(page > 0){
				            page--;
				            paging();
				            saleButtonsPaging();
				        };
				    });
				    paging();
				    saleButtonsPaging();
				});
			}
		});
	});

	$('table').on('click', '#user-select-btn', function(){
		let rowEl = $(this).closest('tr');
		let user_id = rowEl.find('#src_user_id').text();

		$.ajax({
			url: '/user/show',
			method: 'post',
			data: { 
				user_id: user_id
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};


				document.getElementById('main-user-div').style.display = 'none';
				let html = "";
				html += "<tr>";
				html += "<td>Id</td><td>Nome</td><td>username</td><td>Acesso</td><td>Novo ac.</td>";
				html += "</tr>";
				html += "<tr>";
				html += "<td id='src_user_id' hidden>"+response.user[0].id+"</td>";
				html += "<td><a id='user-show-btn'>"+response.user[0].id+"</a></td>";
				html += "<td>"+response.user[0].name+"</td>";
				html += "<td>"+response.user[0].username+"</td>";
				html += "<td>"+response.user[0].acess+"</td>";
				html += "<td><select id='src_user_newAcess'>\
								<option value='gf'>Gerente</option>\
								<option value='cf'>Coord.</option>\
								<option value='cs'>Caixa.</option>\
								<option value='vf'>C.vend</option>\
								<option value='vf'>Vend</option>\
								<option value='ef'>Estoq.</option>\
							</select></td>";
				html += "<td><a id='user-updateAcess-btn'>Atualizar</a></td>";
				html += "</tr>";
				document.getElementById('show-user-tbl').innerHTML = html;
				document.getElementById('show-user-box').style.display = 'block';
			}
		});
	});

	$('#show-user-tbl').on('click', '#user-updateAcess-btn', function(){
		let rowEl = $(this).closest('tr');
		rowEl.find('#user-updateAcess-btn').css('pointerEvents', 'none');
		let user_id = rowEl.find('#src_user_id').text();
		let user_newAcess = rowEl.find('#src_user_newAcess').val();

		$.ajax({
			url: '/admin/updateAcess',
			method: 'post',
			data: { 
				user_id: user_id,
				user_newAcess: user_newAcess
			},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					rowEl.find('#user-updateAcess-btn').css('pointerEvents', 'auto');
					return;
				};

				if(response.err){
					alert(response.err);
					rowEl.find('#user-updateAcess-btn').css('pointerEvents', 'auto');
					return;
				};

				alert(response.done);

				document.getElementById('show-user-box').style.display = 'none';
				document.getElementById('show-user-tbl').innerHTML = "";
				rowEl.find('#user-updateAcess-btn').css('pointerEvents', 'auto');
			}
		});
	});
});