$(function(){
	// Simple Ajax model
	$("#object-function-btn").on("click", function(event){
		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {},
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				if(response.msg){
					alert(response.msg);
					document.getElementById("create-sale-btn").disabled = false;
					return;
				};

				alert(response.done);
			}
		})
	});

	$("#object-function-frm").submit(function(event){
		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {},
			success: function(response){
				
			}
		})
	});

	$("#object-function-select").on("change", function(event){
		
	});
});