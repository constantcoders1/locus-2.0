// Educators Controller 
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');


// Educator's home view 
// Need to grab from database: announcements, project thumbnails, project names, project 
router.get('/view/:edid', function(req,res){

// Select all projects that this educator created 
  db.Project.findAll({ 
    where: {
      EducatorId: req.params.edid,
    },
  }).then(function(result) {

    // grab data object from each project created by this educator
    var educatorsProjs = []
      for(i in result){
        educatorsProjs.push(result[i].dataValues);
      }
 
    console.log(educatorsProjs);
    // send array of project objects to handlebars
    res.render("educator-view", {"data": educatorsProjs} )
    });
  });

// ?? Not necessary 
// Educator projects they've created 
// Educator can click on a "view students" button to view all students working on the project
router.get('/my-projects/:edid/', function(req,res){
  db.Project.findAll({ 
      where: {
        EducatorId: req.params.edid,
      }
    }).then(function(result) {

      var educatorProjs = []
      for (i in result){
        educatorProjs.push(result[i].dataValues)
      }
      res.render("select-proj-view-students", {"data": educatorProjs} )
    })
  });

// Educator views all of the students on a particular project
router.get('/my-students/:projid', function(req,res){
  db.StudentToProject.findAll({ 
      where: {
        ProjectId: req.params.projid,
      },
      include: [db.Student, db.Project],
    }).then(function(result) {
      console.log(result)
      // push data object for each student working on this project to an array 
      var studentObjArray = []
      for (i in result){
        studentObjArray.push(result[i].dataValues.Student)
      }

      var projObj = result[0].dataValues.Project

      var objForHandlebars = {"project": projObj,
                              "students": studentObjArray}

      res.render("my-students", {data: objForHandlebars} )

    });
});

router.get('/student-data/:studentid', function(req,res){
  db.Student.findAll({ 
    where: {
      id: req.params.studentid,
    },
    include: [db.Fieldnote]
  }).then(function(result) {
      console.log(result)
      // Grab info about this student 
      var student_obj = result[0].dataValues; 

      var notes_array = []
      for (i in result){
        notes_array.push(result[i].dataValues.Fieldnote)
      }

      objForHandlebars = {"student": student_obj,
                          "notes": notes_array}
      res.render("student-data", {data: objForHandlebars} )
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

router.post('/update-announcement/:projectid', function(req,res){

  var newAnnouncement = {current_announcements: req.body.announcement}
  db.Project.update(newAnnouncement,
    {
      where: {
        id: req.params.projectid
      }
    }).then(function(result) {
      console.log("Project " + req.params.projectid + " Announcement Update: " + req.body.announcement );
    });
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
