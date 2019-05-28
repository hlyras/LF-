$(function(){
	// Simple Ajax model
	$("#user-editInfo-btn").on("click", function(event){
		let editInfoFrm = document.getElementById('user-editInfo-frm') 
		if(editInfoFrm.style.display=='none'){
			document.getElementById('user-editPassword-frm').style.display = 'none';
			document.getElementById('user-editInfo-frm').style.display = 'block';
		} else {
			document.getElementById('user-editInfo-frm').style.display = 'none';
		};
	});

	$("#user-editPassword-btn").on("click", function(event){
		let editPasswordFrm = document.getElementById('user-editPassword-frm') 
		if(editPasswordFrm.style.display=='none'){
			document.getElementById('user-editInfo-frm').style.display = 'none';
			document.getElementById('user-editPassword-frm').style.display = 'block';
		} else {
			document.getElementById('user-editPassword-frm').style.display = 'none';
		};
	});

	$("#user-updateInfo-btn").on("click", function(event){
		let user_birth = lib.convertDate(document.getElementById('src_user_newBirth').value);

		console.log(user_birth);
	});

	$("#user-updatePassword-btn").on("click", function(event){
		let editPasswordFrm = document.getElementById('user-editPassword-frm') 
		if(editPasswordFrm.style.display=='none'){
			document.getElementById('user-editInfo-frm').style.display = 'none';
			document.getElementById('user-editPassword-frm').style.display = 'block';
		} else {
			document.getElementById('user-editPassword-frm').style.display = 'none';
		};
	});
});