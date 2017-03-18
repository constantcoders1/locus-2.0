// Student Controller 
// var passportStudent = require("../config/passportStudent");
// var passportTeacher = require("../config/passportTeacher");
var isAuthenticated = require("../config/middleware/isAuthenticated");


var db = require("../models");
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');


// var connection = require('../config/connection.js')
router.get('/viewall', isAuthenticated, function(req, res) {
   var sid = -1;
  if (req.user.role == "Student") {
     	sid = req.user.id;
     }
    db.Fieldnote.findAll({include: [db.Student]}).then(function(dbFieldnotes) {
    var newFieldNotes = []
        for (i in dbFieldnotes){
        	 var showDelete = false;
        	 if (dbFieldnotes[i].StudentId == sid)  showDelete = true;
        	 dbFieldnotes[i].newnotedate = moment(dbFieldnotes[i].notedate).format( "MM-DD-YYYY");
        	 dbFieldnotes[i].showDeleteBtn = showDelete;
          	newFieldNotes.push(dbFieldnotes[i].dataValues)
        }
    res.render("notes/show_notes_view", {data: dbFieldnotes})
    //res.send(dbFieldnotes);
       });
});

router.get('/view/:projectid', isAuthenticated, function(req, res) {
   var sid = -1;
  if (req.user.role == "Student") {
     	sid = req.user.id;
     }
	 db.Project.findAll({
        where: {
        id: req.params.projectid
      }
     
    }).then(function(dbProject) {
    db.Fieldnote.findAll({
    		where: {
        ProjectId: req.params.projectid
      },
        include: [db.Student]
    }).then(function(dbFieldnotes) {
    	var newFieldNotes = []
        for (i in dbFieldnotes){
        	 var showDelete = false;
        	 if (dbFieldnotes[i].StudentId == sid)  showDelete = true;
        	 dbFieldnotes[i].newnotedate = moment(dbFieldnotes[i].notedate).format( "MM-DD-YYYY");
        	 dbFieldnotes[i].showDeleteBtn = showDelete;
          	newFieldNotes.push(dbFieldnotes[i].dataValues)
        }
    	//dbFieldnotes[i].newnotedate = moment(dbFieldnotes[i].notedate).format( "MM-DD-YYYY");

    res.render("notes/notes_view", {data: dbFieldnotes, Project: dbProject })
       });
});
   });

router.get('/create/:projectid/:studentid', isAuthenticated, function(req, res) {
  if (req.user.role == "Student") {
     req.user.id;
    //res.send(dbFieldnotes);
    
    //res.send(dbFieldnotes);
    //console.log(dbFieldnotes);
    res.render("notes/notes", {projectid: req.params.projectid, studentid:  req.user.id });
}else{
	res.render("Sorry! you don't have the permissions to create this entry!")
}
      
});

router.get('/delete/:noteid', function(req, res) {
  db.Fieldnote.destroy({
    where: {
      id: req.params.noteid
    }
  }).then(function() {
    res.redirect('/notes/viewall');
  });
});

router.post('/view', function(req, res) {

    var query = "SELECT * FROM users WHERE email = ?";

    connection.query(query, [req.body.email], function(err, response) {
        if (response.length == 0) {
            res.redirect('/users/sign-in')
        }

        bcrypt.compare(req.body.password, response[0].password_hash, function(err, result) {
            if (result == true) {

                req.session.logged_in = true;
                req.session.user_id = response[0].id;
                req.session.user_email = response[0].email;
                req.session.company = response[0].company;
                req.session.username = response[0].username;

                res.redirect('/coupons');
            } else {
                res.redirect('/users/sign-in')
            }
        });
    });
});

router.post("/create/:projectid/:studentid", function(req, res) {
    console.log("creating note");
    console.log(req.body);
    var myRoute = "/notes/view/" + req.params.projectid;
    console.log(myRoute);
    console.log(req.params.projectid);
    db.Fieldnote.create(req.body).then(function() {
        console.log("created a note")
            res.redirect( myRoute);
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
// 	db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
//       res.send("Student's individual data view ");;
//     });
// });

// // Form for posting data 
// // Get project(s) this student is working to display as options in the form 

// router.get('/new-entry/:studentid/:projectid', function(req,res){
// 	db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
//       res.send("Student's form for posting new data ");;
//     });
// });

// // Post new entry to the database 

// router.post('/new-entry/:studentid/:projectid', function(req,res){
// 	db.Fieldnotes.findAll({}).then(function(dbFieldnotes) {
//       res.send("Student posted new entry to the database");;
//     });
// });

// TBI: Edit an existing entry 

// router.put('/', function(req,res){
// 	db.Fieldnotes.update({
// 		// Form
// 	      // text: req.body.text,
// 	      // complete: req.body.complete
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
