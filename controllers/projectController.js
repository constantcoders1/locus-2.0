v// Student Controller 
var passportStudent = require("../config/passportStudent");
var passportTeacher = require("../config/passportTeacher");
var isAuthenticated = require("../config/middleware/isAuthenticated");


var db = require("../models");
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// var connection = require('../config/connection.js')
router.get('/viewall', function(req, res) {
    db.Fieldnote.findAll({}).then(function(dbProject) {
    //res.send("View Notes");
    //console.log(dbFieldnotes);
    res.send(dbFieldnotes);
       });
});

router.get('/:projectid/:studentid', function(req, res) {
    db.Fieldnote.findAll({}).then(function(dbProject) {
    //res.send(dbFieldnotes);
    //console.log(dbFieldnotes);
    res.render("/projects/create", {data: dbProject })
       });
});


router.post('/view', function(req, res) {

});

router.post("/create", function(req, res) {
    console.log("creating project");
    console.log(req.body);
    db.Project.create(req.body).then(function() {
        console.log("created a project")
            //res.redirect(307, "/view");
            res.send(req.body);
    }).catch(function(err) {
        console.log(err);
        res.json(err);
    }); 

    // need to get keyword & look up teacher id
});
// Student's individual data view 
// Get all data from all projects posted by this student 

// router.get('/my-data/:studentid', function(req,res){
//  db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
//       res.send("Student's individual data view ");;
//     });
// });

// // Form for posting data 
// // Get project(s) this student is working to display as options in the form 

// router.get('/new-entry/:studentid/:projectid', function(req,res){
//  db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
//       res.send("Student's form for posting new data ");;
//     });
// });

// // Post new entry to the database 

// router.post('/new-entry/:studentid/:projectid', function(req,res){
//  db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
//       res.send("Student posted new entry to the database");;
//     });
// });

// TBI: Edit an existing entry 

// router.put('/', function(req,res){
//  db.Fieldnotes.update({
//    // Form
//        // text: req.body.text,
//        // complete: req.body.complete
//     }, {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(dbFieldnotes) {
//       res.send("Student Entry Edit");;
//     });
// });

// TBI: Delete an existing entry 

// router.delete('/', function(req,res){
//     db.Fieldnotes.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbFieldnotes) {
//       res.send("Student Entry Delete");;
//     });
// });

module.exports = router;
