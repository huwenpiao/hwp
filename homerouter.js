const express = require("express");
const formidable = require("formidable");
const path = require("path");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const url = require("url");
const querysting = require("querystring");
const xtpl = require("xtpl");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/hwpuser");

router.get("/home",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Method","POST");
    res.setHeader("Access-Control-Allow-Headers","Content-Type");
    console.log(querysting.parse(url.parse(req.url).query).username);
    let username = querysting.parse(url.parse(req.url).query).username;
    let paths = path.join(__dirname,"static","views","home.html");
    res.render("home",{name:username},(err,data)=>{
        if(err){
            console.log(err.toString());
            return;
        }
        res.end(data);
    });
});
module.exports = router;