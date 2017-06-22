
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
var moment = require('moment');
// var connection = require('../config/connection.js')

// Student's home view 
// Get announcements from student's teacher(s) and project(s) student is working on 

//added partials to the file path here//
router.get('/view/:studentid', isAuthenticated, function(req,res){

  var sid = -1;
  if (req.user.role == "Student") {
      sid = req.user.id;
     }


	db.Student.findAll({ 
    where: {
      id: req.user.id,
    },
    include: [db.StudentToProject]
  }).then(function(result) {
      var student_objs = result; 

// for testing will be removed
      console.log(result)

      // Get the ids of each of the projects the student is working on 
      var projIds = []
      for (i in student_objs){     
          student_objs[i].notedate = moment(result[i].notedate).format("MM-DD-YYYY")        

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
          result[i].dataValues.notedate = moment(result[i].notedate).format("MM-DD-YYY")
          obj_for_handlebars.push(result[i].dataValues)
        }
         
        console.log(obj_for_handlebars)
        console.log("studentsController.js  router.get/view/:studentid")
        res.render("students/student-view", {projects: obj_for_handlebars} )

      });

    });
});


router.get('/navview', isAuthenticated, function(req,res){

  var sid = -1;
  if (req.user.role == "Student") {
      sid = req.user.id;
     }


  db.Student.findAll({ 
    where: {
      id: req.user.id,
    },
    include: [db.StudentToProject]
  }).then(function(result) {
      var student_objs = result; 

// for testing will be removed
      console.log(result)

      // Get the ids of each of the projects the student is working on 
      var projIds = []
      for (i in student_objs){     
          student_objs[i].notedate = moment(result[i].notedate).format("MM-DD-YYYY")        

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
          result[i].dataValues.notedate = moment(result[i].notedate).format("MM-DD-YYY")
          obj_for_handlebars.push(result[i].dataValues)
        }
         
        console.log(obj_for_handlebars)
        console.log("studentsController.js  router.get/view/:studentid")
        res.render("students/student-view", {projects: obj_for_handlebars} )

      });

    });
});

// Student's individual data view 
// Get all data from all projects posted by this student 

router.get('/my-data/:studentid', isAuthenticated, function(req,res){
  console.log("user  " + req.user.id)
  
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
        student_objs[i].notedate = moment(student_objs[i].notedate).format("MM-DD-YYYY")
        projIds.push(student_objs[i].dataValues.StudentToProject.dataValues.ProjectId)
      }
      console.log("projIds" + projIds)
      
       db.Fieldnote.findAll({ 
        where: {
          StudentId: req.user.id,
        }, include: [db.Project]

      }).then(function(result) {

        console.log(result)
        var obj_for_handlebars = []
        for (i in result){
          result[i].dataValues.notedate = moment(result[i].notedate).format("MM-DD-YYYY")
          result[i].dataValues.showDeleteBtn = true;
          obj_for_handlebars.push(result[i].dataValues)
        }

        console.log(obj_for_handlebars)
        console.log("studentsController.js  router.get/my-data/:studentid")
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
    
        res.render("students/project-view", {"data": data})
      });
    });
  }
});


router.get('/delete/:noteid', function(req, res) {
  console.log("delete note ")
  console.log("student = " + req.user.id)
  db.Fieldnote.destroy({
    where: {
      id: req.params.noteid
    }
  }).then(function() {

    res.redirect("/student/my-data/"+req.user.id)
    // res.redirect('/notes/viewall');
  });
});


router.post('/join-project/:projectid', isAuthenticated, function(req,res){
  db.StudentToProject.create({
          ProjectId: req.params.projectid,
          StudentId: req.user.id,
      }).then(function(dbFieldnotes) {
  res.redirect("/notes/view/"+req.params.projectid);;
    });
});

router.get('/leaderboard', isAuthenticated, function(req, res) {
  // get all projects from database 
  if (req.user){
/*  db.Fieldnote.findAll({
  group: ['StudentId'],
  attributes: ['StudentId', [db.sequelize.fn('COUNT', 'StudentId'), 'DataCount']],
}).then(function (data) {
  res.json(data)
});*/

db.sequelize.query("select count(*) project, st.username uname, pj.name  pname , YEAR(fn.UpdatedAt) yr, MONTH(fn.UpdatedAt) mo , MONTHNAME(fn.UpdatedAt) mname from fieldnotes fn, students st, projects pj where fn.StudentId = st.id and pj.id = fn.ProjectId group by uname, pname, yr, mo, mname having project > 2 order by  yr desc, mo desc, project desc"

  ).then(function(data) {
    //res.json(data[0]);
    res.render("students/leader-view", {"data": data[0]})
}); //JSON.stringify(data)
  /*if (req.user){
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
  });*/
  }
});



module.exports = router;
