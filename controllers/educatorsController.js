// Student Controller 
// var passportStudent = require("../config/passportStudent");
// var passportTeacher = require("../config/passportTeacher");

var isAuthenticated = require("../config/middleware/isAuthenticated");


var db = require("../models");
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
// var connection = require('../config/connection.js')

// Educator's home view 
// Need to grab from database: announcements, project info, project thumbnails 
router.get('/view/:edid', function(req,res){
  db.Project.findAll({ 
    where: {
      EducatorId: req.params.edid,
    },
    // include: [db.StudentToProject]
  }).then(function(result) {
    console.log(result)

    var educatorsProjs = []
      for(i in result){
        educatorsProjs.push(result[i].dataValues);
      }
 
    console.log(educatorsProjs);
      // var student_objs = result; 

      // Get the ids of each of the projects the student is working on 
      // var projIds = []
      // for (i in student_objs){          
      //   projIds.push(student_objs[i].dataValues.StudentToProject.dataValues.ProjectId)
      // }

      // console.log("projIds" + projIds)
      // db.Project.findAll({ 
      //   where: {
      //     id: projIds,
      //   },
      //   include: [db.Educator]

      // }).then(function(result) {

      //   var obj_for_handlebars = []
      //   for (i in result){
      //     obj_for_handlebars.push(result[i].dataValues)
      //   }

      //   console.log(obj_for_handlebars)
      res.render("educator-view", {"data": educatorsProjs} )

      // });

    });
});

// Student's individual data view 
// Get all data from all projects posted by this student 

router.get('/my-data/:studentid', function(req,res){
  db.Student.findAll({ 
    where: {
      id: req.params.studentid,
    },
    include: [db.StudentToProject]
  }).then(function(result) {
      var student_objs = result; 

      // Get the ids of each of the projects the student is working on 
      var projIds = []
      for (i in student_objs){          
        projIds.push(student_objs[i].dataValues.StudentToProject.dataValues.ProjectId)
      }
      console.log("projIds" + projIds)
      
      db.Fieldnote.findAll({ 
        where: {
          ProjectId: projIds,
        }

      }).then(function(result) {

        var obj_for_handlebars = []
        for (i in result){
          obj_for_handlebars.push(result[i].dataValues)
        }

        console.log(obj_for_handlebars)
        res.render("my-data", {observations: obj_for_handlebars} )
      });

    });
});


// Form for posting data 
// Get project(s) this student is working to display as options in the form 

router.get('/new-entry/:studentid/:projectid', function(req,res){
  // db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
      res.send("Student's form for posting new data ");;
    // });
});

// Post new entry to the database 

router.post('/new-entry/:studentid/:projectid', function(req,res){
  // db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
      res.send("Student posted new entry to the database");;
    // });
});

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
