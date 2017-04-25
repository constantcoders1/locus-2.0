// Project Controller 
// var passportStudent = require("../config/passportStudent");
// var passportTeacher = require("../config/passportTeacher");
var isAuthenticated = require("../config/middleware/isAuthenticated");


var db = require("../models");
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');

// var connection = require('../config/connection.js')
router.get('/viewall',  isAuthenticated, function(req, res) {
   
  if (req.user.role == "Student") {
      res.redirect("/student/viewprojects");
  } else if (req.user.role == "Educator") {
     res.redirect("/educator/viewprojects");
  } else{
      res.redirect("/project/viewallprojects");
  }
    
});

router.get('/viewallprojects', function(req, res) {

    db.Project.findAll({}).then(function(dbProject) {
     res.render("projects/project-view", {data: dbProject});
       });
  
    
});

router.get('/view/:educatorid', function(req, res) {
    db.Project.findAll({
      where: {
        EducatorId: req.params.educatorid
      }

    }).then(function(dbProject) {
    //res.send("View Notes");
    //console.log(dbFieldnotes);
     res.render("projects/index", {data: dbProject});
       });
});


router.get('/update/:projectid', function(req, res) {
    console.log("here***");
    console.log(req.params.projectid);
     //{ where: ["topicId = ? AND deletedAt IS NULL", req.params.id] }
    db.Project.findAll({
        where: {
        id: req.params.projectid
      }
     
    }).then(function(dbProject) {

    //res.send(dbFieldnotes);
    console.log(dbProject);
    console.log("projectController  router.get/update/:projectid")
    res.render("projects/update_project", {data: dbProject, test:"Hello!!" })
       });
});


router.get('/:projectid/:studentid', function(req, res) {
    console.log(req.params.projectid);
     //{ where: ["topicId = ? AND deletedAt IS NULL", req.params.id] }
    db.Project.findAll({
        where: {
        id: req.params.projectid
      }
     
    }).then(function(dbProject) {

    //res.send(dbFieldnotes);
    //console.log(dbFieldnotes);
    console.log(db.Project)
    console.log("projectController  router.get/:projecti/:studentid")
    res.render("projects/index", {data: dbProject, test:"Hello!!" })
       });
});




router.post('/view', function(req, res) {
    res.send('View Projects');
});

router.post("/update/:projectid", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    console.log("in update")
    db.Project.update(
      req.body
    ,{
      where: {
        id: req.params.projectid
      }
    }).then(function(dbProject) {
      res.redirect("/project/viewall");
    });
  });

router.get('/create/:projectid/:studentid', isAuthenticated, function(req, res) {
  if (req.user.role == "Educator") {
    educator_id = req.user.id;
    //res.send(dbFieldnotes);
    //console.log(dbFieldnotes);
    res.render("projects/project", {id: educator_id});
  } else {
    res.send("Sorry! You dont have permission to create a project")
  }
      
});


router.post("/create", function(req, res) {
    console.log("creating project");
    console.log(req.body);
    db.Project.create(req.body).then(function() {
        console.log("created a project")
            res.redirect("/project/viewall");
            //res.send(req.body);
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
