var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// var connection = require('../config/connection.js')
router.get('/viewall', function(req, res) {
    db.Project.findAll({}).then(function(dbProject) {
    //res.send("View Notes");
    //console.log(dbFieldnotes);
    res.send(dbProject);
       });
});