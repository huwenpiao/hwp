const express = require("express");
const formidable = require("formidable");
const path = require("path");
const xtpl = require("xtpl");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const url = require("url");
const querysting = require("querystring");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/hwpuser");
let usernaa = "";
let schema = new mongoose.Schema({
	username: String,
	password: String
});
let user = mongoose.model("user", schema);

let schemate = new mongoose.Schema({
	username: String,
	tex: String,
	month: String,
	date: String,
	type: String,
	imgpath: String,
	// plnums:String
});
let usertew = mongoose.model("usertew", schemate);

let plun = new mongoose.Schema({
	username: String,
	tex: String,
	type: String,
	imgpath: String
});
let pinlin = mongoose.model("pinlin", plun);
router.post("/fabua", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log(req.body.id);
	console.log(req.body.value);
	console.log(req.cookies.name);
	usera.find({ username: req.cookies.userInfo.username }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		console.log(data[0].imgpath);
		pinlin.create({ username: req.cookies.userInfo.username, tex: req.body.value, type: req.body.id, imgpath: data[0].imgpath }, (err, data) => {
			if(err) {
				console.log("注册失败");
				return;
			}
			res.end(JSON.stringify(data));

			// res.end(JSON.stringify({"username":`${req.cookies.name}`,"imgpath":`${data[0].imgpath}`}));
		});
	});
});
router.post("/pingl", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log(req.body.id);
	pinlin.find({ type: req.body.id }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		console.log(data.length);
		res.end(JSON.stringify(data));
	});

});
router.get("/homeindex", (req, res) => {
	console.log(req.cookies.userInfo.username + "----------首页888888888888");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log("cookie-----", req.cookies.userInfo);
	usertew.find({ type: "arr" }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		let arrs = [];
		// console.log(data.length);
		let numb = data.length - 1;
		// let numba = numb-4
		for(var i = numb; i >= 0; i--) {
			arrs.push(data[i]);
		}
		console.log(arrs);
		usera.find({ username: req.cookies.userInfo.username }, (err, data) => {
			if(err) {
				console.log("查找失败");
				return;
			}
			console.log(data);
			let thiimg = `/public/image/${data[0].imgpath}`;
			console.log(thiimg);
			res.render("homeindex", { array: arrs, iimgg: thiimg, uujijn: req.cookies.userInfo.username }, (err, data) => {
				if(err) {
					console.log(err.toString());
					return;
				}
				res.end(data);
			});
		});

		// let tximg
	});

});
router.post("/xxxxg", (req, res) => {
	// console.log(req.cookies);

	console.log(jjjkn + "5555555555555555555555");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	let form = new formidable.IncomingForm();
	// form.encoding = 'utf-8';
	form.uploadDir = "./static/image";
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		// console.log(req.cookies.name+"444444444444444444");
		//      console.log(fields);
		// console.log(files.pho.path);//文件
		let imgarr = files.pho.path.split("\\");
		//      console.log(imgarr[imgarr.length-1]);
		let aaimg = imgarr[imgarr.length - 1];
		if(aaimg.endsWith(".jpg") || aaimg.endsWith(".png") || aaimg.endsWith(".jpeg") || aaimg.endsWith(".bmp") || aaimg.endsWith(".svg") || aaimg.endsWith(".gif")) {
			console.log("shide ");
			usera.update({ username: jjjkn }, { username: fields.username, password: fields.password, imgpath: imgarr[imgarr.length - 1] }, (err, data) => {
				if(err) {
					console.log("查找失败");
					return;
				}

				res.cookie("userInfo", { username: fields.username, password: fields.password });
				//              console.log(req.cookies.userInfo.username+"-------------------888888888888888888888888888888888");
				//              console.log(req.cookies.userInfo);
				usertew.find({ username: jjjkn }, (err, data) => {
					if(err) {
						console.log("查找失败");
						return;
					}
					console.log("------------------------------------------------------------------");
					console.log(data + "+++++++++++++++++");
					console.log("------------------------------------------------------------------");
					console.log(imgarr[imgarr.length - 1] + "---------------.................");
					for(let i = 0; i < data.length; i++) {
						usertew.update({ username: jjjkn }, { username: fields.username, imgpath: imgarr[imgarr.length - 1] }, (err, data) => {
							if(err) {
								console.log("查找失败");
								return;
							}
							res.end("ok");
						});
					}
					console.log("-+++++++++++++++++++++++++++++++++++++++++++++++++++---");
					console.log(data);
					console.log("--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--");
					// res.end("ss");
				});
				// res.end("ok");
			});
		} else {
			console.log("bushi");
			console.log(req.cookies.userInfo);
			usera.update({ username: jjjkn }, { username: fields.username, password: fields.password }, (err, data) => {
				if(err) {
					console.log("查找失败");
					return;
				}
				res.cookie("userInfo", { username: fields.username, password: fields.password });
				console.log(req.cookies.userInfo);
				usertew.find({ username: jjjkn }, (err, data) => {
					if(err) {
						console.log("查找失败");
						return;
					}
					console.log(data);
					for(let i = 0; i < data.length; i++) {
						usertew.update({ username: jjjkn }, { username: fields.username }, (err, data) => {
							if(err) {
								console.log("查找失败");
								return;
							}
							// res.end("ok");
						});
					}
					console.log(data);
					// res.end("ss");
				});
				// res.end("ok");
			});
		}

		// usertew.find({username:req.cookies.name},(err,data)=>{
		//     console.log(req.cookies.name+"888888888888888",fields.username+"55555555555555555555555555555");
		//     if (err){
		//         console.log("查找失败");
		//         return;
		//     }
		//     // console.log(data);
		//     for(let i=0;i<data.length;i++){
		//
		//         usertew.update({username:req.cookies.name},{username:fields.username},(err,data)=>{
		//             if (err){
		//                 console.log("查找失败");
		//                 return;
		//             }
		//             res.end("ok");
		//         });
		//     }
		// console.log(data);
		// res.end("ss");
		// });

	})
});
router.post("/gexiu", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	user.update({ username: req.cookies.userInfo.username }, { username: req.body.name, password: req.body.password }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		res.cookie("userInfo", { username: req.body.name, password: req.body.password });
		res.end("ok");
	});
	// res.end("oo");
});
router.post("/xiug", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log(req.body);

	usera.find({ username: req.body.name }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		res.end(JSON.stringify(data));
		// console.log(data);
	});

});
router.post("/rmdel", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log(req.body.id);

	usertew.remove({ _id: req.body.id }, (err, data) => {
		if(err) {
			console.log("失败");
			return;
		}
		console.log(req.body.id);
		res.end("ok");
	});
});
router.post("/xiugai", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log(req.body);

	usertew.update({ _id: req.body.id }, { tex: req.body.text }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		usertew.find({ _id: req.body.id }, (err, data) => {
			console.log(data);
			// fs.writeFileSync("./tex.json",data);
		});
		res.end("ok");
		// res.setHeader("Content-Type","text/html;charset=utf8");
		// res.json(data);
	});
	// res.end("ok");
});
router.post("/publish", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log(req.body);
	console.log(req.cookies.name)
	usera.find({ username: req.cookies.userInfo.username }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		console.log(data);
		console.log(data[0].imgpath + "00000000000");
		let iim = `${data[0].imgpath}`;
		usertew.create({ username: req.body.username, tex: req.body.text, month: req.body.month, date: req.body.date, type: "arr", imgpath: iim }, (err, data) => {
			if(err) {
				console.log("失败");
				return;
			}
			res.end("ok");
		});
	});

});

router.post("/login", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	console.log("Cookies: ", req.cookies);
	// req.cookie.name=req.body.username;
	// req.cookie.password=req.body.password;
	// console.log(req.body);
	usernaa = req.body.username;
	let userpa = req.body.password;
	user.find({ username: usernaa }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		// console.log(data);
		if(data.length == 0) {
			console.log("no");
			res.end("no");
		} else {
			// console.log(data[0].username);
			// console.log(data[0].password);
			if(data[0].password != userpa) {
				res.end("no");

			} else {
				// console.log(data[0]._id);
				// res.end(data[0]._id);
				console.log("ok");
				res.cookie("userInfo", { username: req.body.username, password: req.body.password })
				res.end("ok")
			}

		}
	});
});

let schemaa = new mongoose.Schema({
	username: String,
	password: String,
	imgpath: String
});
let usera = mongoose.model("usera", schemaa);

router.post("/registers", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	// console.log(req.body);
	let form = new formidable.IncomingForm();
	// form.encoding = 'utf-8';
	form.uploadDir = "./static/image";
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		console.log(fields.password.length); //字符串提交
		usera.find({ username: fields.username }, (err, data) => {
			if(err) {
				console.log("查找失败");
				return;
			}
			// console.log(data.length);
			if(data.length == 0 && fields.password.length != 0) {
				// res.end("no");
				console.log(files.pho.path); //文件
				let imgarr = files.pho.path.split("\\");
				console.log(imgarr[imgarr.length - 1]);
				usera.create({ username: fields.username, password: fields.password, imgpath: imgarr[imgarr.length - 1] }, (err, data) => {
					if(err) {
						console.log("注册失败");
						return;
					}
					res.end("ok");
				});
			} else {
				res.end("yes");
			}
		});
		// console.log(files);//文件
	});
	// let pho = req.body.pho;
	//3.0 创建文件读取流对象

});
router.post("/register", (req, res) => {
	// console.log(req.body);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Method", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	let usern = req.body.username;
	let userpa = req.body.password;
	// let pho = req.body.pho;
	//3.0 创建文件读取流对象
	user.find({ username: usern }, (err, data) => {
		if(err) {
			console.log("查找失败");
			return;
		}
		// console.log(data.length);
		if(data.length == 0) {
			user.create({ username: usern, password: userpa }, (err, data) => {
				if(err) {
					console.log("注册失败");
					return;
				}
				res.end("ok");
			});

		} else {
			res.end("yes");
		}

	});
});

// router.get("/bing",(req,res)=>{
//     axios.get("https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc=1534899818708&pid=hp")
//         .then((response)=>{
//             console.log(response.data.images[0].url);
//             let imgurl = `https://cn.bing.com/${response.data.images[0].url}`;
//             res.end(imgurl);
//         });
// });
let jjjkn = "";
router.get("/home", (req, res) => {
	console.log(req.cookies.userInfo.username + "112222111118787887781");
	jjjkn = req.cookies.userInfo.username;
	res.setHeader("Access-Control-Allow-Origin", "*");
	// res.setHeader("Access-Control-Allow-Method","POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	// console.log( req.cookies.userInfo.username);
	// console.log(querysting.parse(url.parse(req.url).query).num);
	// let numm = querysting.parse(url.parse(req.url).query).num;
	if(req.cookies.userInfo.username) {
		console.log(1);
		let usernames = req.cookies.userInfo.username;
		// console.log(usernames);

		// usernames = decodeURIComponent(usernames);
		let paths = path.join(__dirname, "static", "views", "home.html");
		let im = "";
		usera.find({ username: usernames }, (err, data) => {
			if(err) {
				console.log("查找失败");
				return;
			}
			//          console.log(data+"77777777777");
			im = `/public/image/${data[0].imgpath}`;
			let iiimm = data[0].imgpath;
			

			usertew.find({ username: usernames }, (err, data) => {
				console.log(data.length);
				for(let i = 0; i < data.length; i++) {
					console.log(iiimm + "---------------------------------------");
					usertew.update({ username: usernames }, { imgpath: iiimm }, (err, data) => {
						if(err) {
							console.log("查找失败");
							return;
						}
						console.log(data);
						usertew.find({ username: usernames }, (err, data) => {
							console.log(data);
						});
						//						console.lo
						//          res.end("ok");
					});
				}

				let arrs = [];
				// console.log(data.length);
				let numb = data.length - 1;
				// let numba = numb-4
				for(var i = numb; i >= 0; i--) {
					arrs.push(data[i]);
				}
				// console.log(arrs);
				res.render("home", { name: usernames, imm: im, array: arrs }, (err, data) => {
					if(err) {
						console.log(err.toString());
						return;
					}
					res.end(data);

				});
				// fs.writeFileSync("./tex.json",data);
			});

		});
	} else {
		console.log(0);
		res.end("00");
	}

});
let nuhh = 0;

module.exports = router;