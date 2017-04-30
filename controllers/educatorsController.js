// Educators Controller 
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");
var express = require('express');
var router  = express.Router();
var mysql = require('mysql');


// Educator's home view 
// Need to grab from database: announcements, project thumbnails, project names, project 
router.get('/view/:edid', isAuthenticated, function(req,res){
  if (req.user.role == "Educator"){
// Select all projects that this educator created 
  db.Project.findAll({ 
    where: {
      EducatorId: req.user.id,
    },
  }).then(function(result) {

    // grab data object from each project created by this educator
    var educatorsProjs = []
      for(i in result){
        educatorsProjs.push(result[i].dataValues);
      }
 
    console.log(educatorsProjs);
    // send array of project objects to handlebars
    res.render("educators/educator-view", {"data": educatorsProjs} )
  
    });
  }else if (req.user.role == "Student"){
    res.redirect("/student/view/req.user.id")
  }else{
    res.redirect("/home.html")
  }
});

router.get('/viewprojects',  function(req, res) {
  
  
    db.Project.findAll({}).then(function(dbProject) {
    //res.send("View Notes");
    //console.log(dbProject);
     res.render("/educators/project-view", {data: dbProject});
        console.log('---------------------------');
        console.log('-----HIT LINE 47 in educatorsController.js----');
        console.log('---------------------------');

       });
});

// ?? Not necessary 
// Educator projects they've created 
// Educator can click on a "view students" button to view all students working on the project
// router.get('/my-projects/:edid', isAuthenticated, function(req,res){
//   db.Project.findAll({ 
//       where: {
//         EducatorId: req.user.id,
//       }
//     }).then(function(result) {

//       var educatorProjs = []
//       for (i in result){
//         educatorProjs.push(result[i].dataValues)
//       }
//       res.render("select-proj-view-students", {"data": educatorProjs} )
//     })
//   });

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

      res.render("/educators/my-students", {data: objForHandlebars} )
        console.log('---------------------------');
        console.log('-----HIT LINE 89 in educatorsController.js----');
        console.log('---------------------------');
    });
});

router.get('/student-data/:studentid', isAuthenticated,  function(req,res){
  if (req.user.role == "Educator"){
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
      res.render("/educators/student-data", {data: objForHandlebars} )
    });
  }
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
    res.redirect("/educator/view/1")
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
