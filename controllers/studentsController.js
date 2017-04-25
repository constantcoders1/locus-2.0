// Student Controller 
// var passportStudent = require("../config/passportStudent");
// var passportTeacher = require("../config/passportTeacher");

var isAuthenticated = require("../config/middleware/isAuthenticated");


var db = require("../models");
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
var moment = require('moment');
// var connection = require('../config/connection.js')

// Student's home view 
// Get announcements from student's teacher(s) and project(s) student is working on 

router.get('/view/:studentid', isAuthenticated, function(req,res){
	db.Student.findAll({ 
    where: {
      id: req.user.id,
    },
    include: [db.StudentToProject]
  }).then(function(result) {
      var student_objs = result; 

      // Get the ids of each of the projects the student is working on 
      var projIds = []
      for (i in student_objs){     
          student_objs[i].notedate = moment(result[i].notedate).format("MM-DD-YYY")        

        projIds.push(student_objs[i].dataValues.StudentToProject.dataValues.ProjectId)
      }

      console.log("projIds" + projIds)
      db.Project.findAll({ 
        where: {
          id: projIds,
        },
        include: [db.Educator]

      }).then(function(result) {

        var obj_for_handlebars = []
        for (i in result){
          result[i].notedate = moment(result[i].notedate).format("MM-DD-YYY")
          obj_for_handlebars.push(result[i].dataValues)
        }
         
 // for (i in dbFieldnotes){
          
 //           dbFieldnotes[i].newnotedate = moment(dbFieldnotes[i].notedate).format( "MM-DD-YYYY");
       
 //            newFieldNotes.push(dbFieldnotes[i].dataValues)
 //        }


        console.log(obj_for_handlebars)
        console.log("studentsController.js  router.get/view/:studentid")
        res.render("students/student-view", {projects: obj_for_handlebars} )

      });

    });
});

// Student's individual data view 
// Get all data from all projects posted by this student 

router.get('/my-data/:studentid', isAuthenticated, function(req,res){
  db.Student.findAll({ 
    where: {
      id: req.user.id,
    },
    include: [db.StudentToProject]
  }).then(function(result) {
      var student_objs = result; 

      // Get the ids of each of the projects the student is working on 
      var projIds = []
      for (i in student_objs){     
          student_objs[i].notedate = moment(result[i].notedate).format("MM-DD-YYYY")
        projIds.push(student_objs[i].dataValues.StudentToProject.dataValues.ProjectId)
      }
      console.log("projIds" + projIds)
      
      db.Fieldnote.findAll({ 
        where: {
          ProjectId: projIds,
        }, include: [db.Project]

      }).then(function(result) {

        var obj_for_handlebars = []
        for (i in result){
          result[i].notedate = moment(result[i].notedate).format("MM-DD-YYYY")
          obj_for_handlebars.push(result[i].dataValues)
        }

        console.log(obj_for_handlebars)
        console.log("studentsController.js  router.get/mydata/:studentid")
        res.render("students/my-data", {observations: obj_for_handlebars} )

      });

    });
});

router.get('/viewprojects', isAuthenticated, function(req, res) {
  // get all projects from database 
  if (req.user){
    db.Project.findAll({include: [db.Educator]
    }).then(function(dbProject1) {
        // Find projects student is already signed up for 
        db.StudentToProject.findAll({where: {StudentId: req.user.id}}).then(function(dbS2P) {
          var matches = []
          for (i in dbS2P){
            matches.push(dbS2P[i].dataValues.ProjectId)
          }

          var data = []
          for (p in dbProject1){
            if (matches.indexOf(dbProject1[p].dataValues.id) > -1){
              dbProject1[p]["match"] = true
            }else{
              dbProject1[p]["match"] = false
            }
            data.push(dbProject1[p])

          }
          console.log(data)
     //      var objForHandlebars = {"data": dbProject1, "Matches": dbS2P}
     //      console.log(objForHandlebars["Matches"])

     // console.log(objForHandlebars)
    
    res.render("students/project-view", {"data": data})
    });
  });
  }
});

// Form for posting data 
// Get project(s) this student is working to display as options in the form 

// router.get('/new-entry/:studentid/:projectid', function(req,res){
// 	// db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
//       res.send("Student's form for posting new data ");;
//     // });
// });

// Post new entry to the database 

router.post('/join-project/:projectid', isAuthenticated, function(req,res){
  db.StudentToProject.create({
          ProjectId: req.params.projectid,
          StudentId: req.user.id,
      }).then(function(dbFieldnotes) {
  res.redirect("/notes/view/"+req.params.projectid);;
    });
});


module.exports = router;
