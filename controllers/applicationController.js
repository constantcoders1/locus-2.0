// Application Controller 
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');

// home page 
router.get('/', function(req,res){
    res.render("application/home", {} )

});


// educator login
router.get('/login/educator', function(req,res){
    res.render("application/educator-login", {} )
});

// educator signup  
router.get('/signup/educator', function(req,res){
    res.render("application/educator-signup", {} )
});

// student login
router.get('/login/student', function(req,res){
    res.render("application/student-login", {} )
});

// student signup  
router.get('/signup/student', function(req,res){
    res.render("application/student-signup", {} )
});





module.exports = router;