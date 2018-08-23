function honn() {
	window.location.href = "/api/home";
}

function pingl(data) {
	console.log(data);

	const xhr = new XMLHttpRequest();
	xhr.open("post", "http://172.17.14.23:7777/api/pingl");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(`id=${data}`);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			//				console.log(xhr.responseText);
			let nrt = JSON.parse(xhr.responseText);
			console.log(nrt.length);
			let inntt = "";
			for(let i = 0; i < nrt.length; i++) {
				inntt += `<li><div class="plubox_bo"><div class="plubox_bo_le"><img src="/public/image/${nrt[i].imgpath}" /></div><div class="plubox_bo_cen"><p><span>${nrt[i].username}</span>${nrt[i].tex}</p></div></div></li>`;

			}
			document.getElementById(`${data}1`).innerHTML = inntt;
			document.getElementById(data).style.display = "block";
		}
	}
}

function fabu(data) {
//	console.log(data);
//	console.log(document.getElementById(`${data}2`).value);
	let tt = document.getElementById(`${data}2`).value;
	if(tt) {
		const xhr = new XMLHttpRequest();
		xhr.open("post", "http://172.17.14.23:7777/api/fabua");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(`id=${data}&value=${tt}`);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				let dat = JSON.parse(xhr.responseText);
				console.log(dat.username);
				document.getElementById(`${data}2`).value = "";
				let inntt = document.createElement("li");
				inntt.innerHTML = `<li><div class="plubox_bo"><div class="plubox_bo_le"><img src="/public/image/${dat.imgpath}" /></div><div class="plubox_bo_cen"><p><span>${dat.username}</span>${tt}</p></div></div></li>`;
//				console.log(inntt.innerHTML);
				document.getElementById(`${data}1`).appendChild(inntt);
//				document.getElementById(`${data}1`).insertBefore(inntt,document.getElementById(`${data}1`).childNodes[0])
			}
		}
	} else {
		alert("请填写内容")
	}
}
function tuichu(){
	window.location.href="http://172.17.14.23:7777/";
}

function shouqi(data){
	console.log(data);
	document.getElementById(data).style.display = "none";
}

window.onload = function(){

}
