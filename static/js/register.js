function view() {
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	};
}
window.onload = function() {

	document.body.style.height = view().h + "px";
	document.body.style.width = view().w + "px";
}
window.onresize = function() {
	document.body.style.height = view().h + "px";
	document.body.style.width = view().w + "px";
}

function register() {
	console.log(document.getElementById("username").value);
	console.log(document.getElementById("password").value);

	if(document.getElementById("username").value.length && document.getElementById("password").value) {
//		 	console.log(document.getElementById("pho").value);
		let username = document.getElementById("username").value;
		let passwords = document.getElementById("password").value;
//		 let pho = document.getElementById("pho").value;
		let xhr = new XMLHttpRequest();
		xhr.open("post", "http://172.17.14.23:7777/api/register");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(`username=${username}&password=${passwords}`);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				if(xhr.responseText == "no") {

				} 
				if(xhr.responseText == "yes"){
					alert("该用户名已经注册");
				}
				if(xhr.responseText == "ok") {
					alert("注册成功");
					window.location.href="http://172.17.14.23:7777/";
				}
			}
		}
	} else {
		alert("请输入完整信息");
	}

}