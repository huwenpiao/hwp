const express = require("express");
const fs = require("fs");
const path = require("path");
const xtpl = require("xtpl");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const roter = express.Router();
app.set("views","./static/views");
app.set("view engine","html");
app.engine("html",xtpl.renderFile);
roter.use("/public",express.static("./static"));
let filepath ="";
app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Method","POST");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");
    filepath=path.join(__dirname,"static","views","index.html");
    console.log(filepath);
    axios.get("https://momentumdash.com/app/backgrounds.json")
        .then((response)=>{
            console.log(response.data.backgrounds.length);
            let len = response.data.backgrounds.length;
            let numj= randomNum(0,len);
            console.log(`https://momentumdash.com/backgrounds/${response.data.backgrounds[numj].filename}`);
            let jjim = `https://momentumdash.com/backgrounds/${response.data.backgrounds[numj].filename}`;
            res.render("index",{name:"asdasd",urlimg:jjim},(err,data)=>{
                if(err){
                    console.log(err.toString());
                    return;
                }
                console.log(randomNum(0,8));
                res.end(data);
            });
        });


});
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
app.use(cookieParser());
app.use("/api",require("./apiserver"));
app.use("/register",require("./registerrouter"));
app.use(require("./homerouter"));
app.use(roter);
app.listen(7777);