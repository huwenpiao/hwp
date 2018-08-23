const express = require("express");
const formidable = require("formidable");
const path = require("path");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
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

router.get("/register",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Method","POST");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");
    axios.get("https://momentumdash.com/app/backgrounds.json")
        .then((response)=>{
            console.log(response.data.backgrounds.length);
            let len = response.data.backgrounds.length;
            let numj= randomNum(0,len);
            console.log(`https://momentumdash.com/backgrounds/${response.data.backgrounds[numj].filename}`);
            let jjim = `https://momentumdash.com/backgrounds/${response.data.backgrounds[numj].filename}`;
            res.render("register",{urlimg:jjim},(err,data)=>{
                if(err){
                    console.log(err.toString());
                    return;
                }
                // console.log(data);
                res.end(data);
            });
        });

});
module.exports = router;