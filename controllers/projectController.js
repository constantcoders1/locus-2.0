// Project Controller 
// var passportStudent = require("../config/passportStudent");
// var passportTeacher = require("../config/passportTeacher");
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');


router.get("/about/about-view", isAuthenticated, function(req,res) {

    if (req.user.role == "Educator") {
        res.render("about/about-view", { userEducator: true, userStudent: false });
      } else {
        res.render("about/about-view", { userStudent: true, userEducator: false});
      }
});


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

       if (req.user.role == "Educator") {
        res.render("projects/project-view", {data: dbProject, userEducator: true });
      } else {
        res.render("projects/project-view", {data: dbProject, userEducator: false });
      } 

  });    
});


router.get('/guestviewallprojects', function(req, res) {

    db.Project.findAll({}).then(function(dbProject) {
        res.render("projects/guest-project-view", {data: dbProject, });
    });    
});


router.get('/view/:educatorid', function(req, res) {
    db.Project.findAll({
      where: {
        EducatorId: req.params.educatorid
      }

    }).then(function(dbProject) {
        if (req.user.role == "Educator") {
          res.render("projects/index", {data: dbProject, userEducator: true });
        } else {
          res.render("projects/index", {data: dbProject, userEducator: false });
        }
  });
});


router.get('/update/:projectid', function(req, res) {
    console.log("here***");
    console.log(req.params.projectid);
  
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
    console.log("projectController  router.get/:projectid/:studentid")

    if (req.user.role == "Educator") {
        res.render("projects/index", {data: dbProject, userEducator: true });
    } else {
        res.render("projects/index", {data: dbProject, userEducator: false });
    }

  });
});


router.put('/weather/:projectid/:studentid', function(req, res){
  console.log("clicked on get weather button project controller")
})


router.post('/view', function(req, res) {
    res.send('View Projects');
});


router.post("/update/:projectid", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    console.log("in update ")
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

module.exports = router;