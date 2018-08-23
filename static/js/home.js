function fabiao() {
	console.log(0);
	console.log(document.getElementById("textar").value);
	let data = new Date();
	console.log(data.getMonth() + 1);
	console.log(data.getDate());
	let month = buj(data.getMonth() + 1);
	let dates = buj(data.getDate());
	if(document.getElementById("textar").value) {
		const xhr = new XMLHttpRequest();
		xhr.open("post", "http://172.17.14.23:7777/api/publish");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(`username=${document.getElementById("non").innerHTML}&text=${document.getElementById("textar").value}&month=${month}&date=${dates}`);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				if(xhr.responseText == "ok") {
					window.location = window.location;
				}
			}
		}
	} else {
		alert("请编辑内容");
	}
}

function buj(da) {
	if(parseInt(da) < 10) {
		da = "0" + da;
	} else {
		da = da;
	}
	return da;
}
let d_id = "";
let isof = true;

function xgfn(data) {
	console.log(data);
	d_id = data;

	if(isof) {
		document.getElementById("xiugg").innerHTML = "确定";
		document.getElementById("ttt").style.display = "none";
		document.getElementById("textars").style.display = "block";
	} else {

		console.log(document.getElementById("textars").value);
		const xhr = new XMLHttpRequest();
		xhr.open("post", "http://172.17.14.23:7777/api/xiugai");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(`text=${document.getElementById("textars").value}&id=${data}`);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				if(xhr.responseText == "ok") {
					window.location = window.location;
				}
			}
		}

		document.getElementById("xiugg").innerHTML = "修改";
		document.getElementById("ttt").style.display = "block";
		document.getElementById("textars").style.display = "none";
	}
	isof = !isof;
}

function rmdel(data) {
	console.log(data);
	const xhr = new XMLHttpRequest();
	xhr.open("post", "http://172.17.14.23:7777/api/rmdel");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(`id=${data}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.responseText);
			if(xhr.responseText == "ok") {
				window.location = window.location;
			}
		}
	}
}

function xiug(data) {
	console.log(data);

	let uname = document.getElementById("username");
	let upass = document.getElementById("password");
	let pho = document.getElementById("pho");
	console.log(uname);
	const xhr = new XMLHttpRequest();
	xhr.open("post", "http://172.17.14.23:7777/api/xiug");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(`name=${data}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.responseText);
			let zll = JSON.parse(xhr.responseText);
			console.log(zll[0].username);
			console.log(zll[0].password);
			uname.value = zll[0].username;
			upass.value = zll[0].password;
			document.getElementsByClassName("box")[0].style.display = "block";
		}
	}
}

function tuichu() {
	//	console.log(0);
	console.log($.cookie("name"));
	$.cookie("name", null);
	window.location.href = "/";
}

function gexiu(data) {
	let uname = document.getElementById("username").value;
	let upass = document.getElementById("password").value;
	console.log(uname, upass);
	const xhr = new XMLHttpRequest();
	xhr.open("post", "http://172.17.14.23:7777/api/gexiu");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(`name=${uname}&password=${upass}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			console.log(xhr.responseText);
			if(xhr.responseText == "ok") {

				alert("修改成功");
				setTimeout(function() {
					$.cookie("name", uname);
					window.location = window.location;
				}, 500)

			}

		}
	}
}
document.getElementById("guanbis").onclick = function() {
	document.getElementsByClassName("box")[0].style.display = "none";
}

//$(window).scroll(function() {
//	console.log($.cookie("num"));
//	num = $.cookie("num");
//	let scrollTop = $(this).scrollTop(); //scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置
//	let scrollHeight = $(document).height(); //整个文档的高度
//	let windowHeight = $(this).height(); //当前可见区域的大小
//	
//	if(scrollTop + windowHeight == scrollHeight) {
//		//		console.log('The page has been scrolled to the bottom');
//		num++;
//		console.log(num);
//		const xhr = new XMLHttpRequest();
//		xhr.open("post", "http://127.0.0.1:7777/api/fany");
//		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//		xhr.send(`num=${num}`);
//		xhr.onreadystatechange = function() {
//			if(xhr.readyState == 4 && xhr.status == 200) {
//				console.log(xhr.responseText);
//				if(xhr.responseText) {
////					window.location.href = "/api/home?num="+num;
//				}
//
//			}
//		}
//		$.cookie("num", num);
//	}
//})