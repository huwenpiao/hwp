function view() {
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	};
}
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
window.onload = function() {
	console.log(parseInt(Math.random()*10));
	$.cookie("num", null);
	$.cookie("name", null);
	console.log($.cookie("name"));
	document.body.style.height = view().h + "px";
	document.body.style.width = view().w + "px";
//	const xhr = new XMLHttpRequest();
//	xhr.open("get", "http://172.17.14.23:7777/api/bing");
//	xhr.send(null);
//	xhr.onreadystatechange = function() {
//		if(xhr.readyState == 4 && xhr.status == 200) {
//			let urlimg = xhr.responseText;
//			console.log(urlimg);
//		}
//	}
}
window.onresize = function() {
	document.body.style.height = view().h + "px";
	document.body.style.width = view().w + "px";
}

function login() {
	console.log(document.getElementById("username").value);
	console.log(document.getElementById("password").value);
	if(document.getElementById("username").value.length && document.getElementById("password").value) {
		let username = document.getElementById("username").value;
		console.log(encodeURIComponent(username));
		//		console.log(decodeURIComponent(encodeURIComponent(username)));
		let passwords = document.getElementById("password").value;
		let xhr = new XMLHttpRequest();
		xhr.open("post", "http://172.17.14.23:7777/api/login");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(`username=${username}&password=${passwords}`);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				if(xhr.responseText == "no") {
					alert("用户名或密码错误");
				}

				if(xhr.responseText == "ok") {
					//					alert("登录成功");
					$.cookie("name", username);
					$.cookie("num", "1");
					window.location.href = "http://172.17.14.23:7777/api/homeindex";
					
				}
			}
		}
	} else {
		alert("请输入完整信息");
	}
}

function register() {
	let xhr = new XMLHttpRequest();
	xhr.open("get", "http://172.17.14.23:7777/api/register");
	xhr.send(null);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.responseText);
			if(xhr.responseText == "ok") {
				//				window.location.href="http://";
			}
		}
	}
}