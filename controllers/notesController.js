// Notes Controller
 
// var passportStudent = require("../config/passportStudent");
// var passportTeacher = require("../config/passportTeacher");
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');
var rp = require('request-promise');
const aws = require('aws-sdk');
//const S3_BUCKET = process.env.S3_BUCKET;
const S3_BUCKET = 'locus-image-store';//'node-sdk-sample-test-04272017';
console.log(S3_BUCKET);


router.get("/fieldnote/:noteid/:type", function(req, res) {

  if(req.user.role == "Educator") {
    userEd = true;
  } else {
    userEd = false;
  }
  
  console.log("educator? = "+ userEd)
  console.log("note id = "+ req.params.noteid)
  console.log("type - " + req.params.type)

  db.Fieldnote.findAll({
    where: {
        id: req.params.noteid
       }
      }).then(function(note) {

          console.log(note)

          note[0].dataValues.notedate = moment(note[0].dataValues.notedate).format( "MM-DD-YYYY");
        
          
          if (req.params.type == 'picture' || req.params.type == 'file') {
           
            console.log("show file or pic")
            console.log(userEd)
            res.render("notes/notes_file_view",  {data: note, userEducator: userEd})
         
          } else {

            console.log("not pic or doc")
            
            res.render("notes/notesview", {data: note, userEducator: userEd})
         
          }
 

  })
})


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
        	 dbFieldnotes[i].dataValues.notedate = moment(dbFieldnotes[i].notedate).format( "MM-DD-YYYY");
        	 dbFieldnotes[i].showDeleteBtn = showDelete;
          	newFieldNotes.push(dbFieldnotes[i].dataValues)
        }
        console.log("notes/show_notes_view")
        res.render("notes/show_notes_view", {data: dbFieldnotes})

    });
});



router.get('/view/:sortfield/:direction/:projectid', isAuthenticated, function(req, res) {
    
    if (req.params.direction == "ASC") {
    sortinfo = req.params.sortfield
    } else {
    sortinfo =  req.params.sortfield + " DESC"
    }
    
    
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
        order: sortinfo,
        include: [db.Student]
    }).then(function(dbFieldnotes) {
    
      var newFieldNotes = []
      
      for (i in dbFieldnotes){
           var showDelete = false;
          if (dbFieldnotes[i].StudentId == sid)  showDelete = true;
            
          dbFieldnotes[i].dataValues.notedate = moment(dbFieldnotes[i].notedate).format( "MM-DD-YYYY");
          dbFieldnotes[i].showDeleteBtn = showDelete;
          newFieldNotes.push(dbFieldnotes[i].dataValues)
      }
      
      if (req.user.role == "Educator") {
        res.render("notes/notes_view_educator", {data: dbFieldnotes, Project: dbProject, userEducator: true })
      } else {
        res.render("notes/notes_view_student", {data: dbFieldnotes, Project: dbProject, userEducator: false })
      }
   
    });
  });
});


router.get('/projectmap/:projid', isAuthenticated, function(req, res) {
   
    db.StudentToProject.findAll({
      where: {ProjectId: req.params.projid,
      },
      include: [db.Student]
    }).then(function(genMapData) {
       var mapPoints = []
       var pushPoint = {}
      for(i in genMapData){
         pushPoint = {
              "name": genMapData[i].Student.username,
              "place" : {
                lat : parseFloat(genMapData[i].Student.latitude),
                lng : parseFloat(genMapData[i].Student.longitude),
              },
        }
        mapPoints.push(pushPoint);
     
      }
      res.render("projects/projectmap", {locations: mapPoints})
  })
})


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
        
        dbFieldnotes[i].dataValues.notedate = moment(dbFieldnotes[i].notedate).format( "MM-DD-YYYY");
        dbFieldnotes[i].showDeleteBtn = showDelete;
        newFieldNotes.push(dbFieldnotes[i].dataValues)
      }
      
      if (req.user.role == "Educator") {
        res.render("notes/notes_view_educator", {data: dbFieldnotes, Project: dbProject, userEducator: true })
      } else {
        res.render("notes/notes_view_student", {data: dbFieldnotes, Project: dbProject, userEducator: false })
      }

    });
  });
});


router.get('/create/:projectid/:studentid', isAuthenticated, function(req, res) {
  if (req.user.role == "Student") {
    req.user.id;
    res.render("notes/notes", {projectid: req.params.projectid, studentid:  req.user.id });
  } else {
	res.render("Sorry! you don't have the permissions to create this entry!")
  }
      
});


router.get('/delete/:noteid/:projectid', function(req, res) {

  projectid = req.params.projectid;
  db.Fieldnote.destroy({
    where: {
      id: req.params.noteid
    }
  }).then(function() {
      res.redirect("/notes/view/"+req.params.projectid);
  });
});


router.get('/weather/:projectid/:studentid', function(req, res){
  db.Student.findAll({
      where: {
        id: req.params.studentid
      }
  }).then(function(studentdata) {
    var lng = studentdata[0].longitude
    var lat = studentdata[0].latitude

    var proj = req.params.projectid;
    var stud = req.params.studentid;

    var options = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.darksky.net/forecast/21641b7b2b96f7eede5a22906c35deb8/" + lat + "," + lng + "?exclude=flags%2Cminutely%2Chourly",
      "method": "GET",
      "json": true,
    }

    rp(options)
      .then(function (response) {
      
        var timezone = response.timezone;
        
        var hightemp = response.daily.data[0].temperatureMax;
        var lowtemp = response.daily.data[0].temperatureMin;

        var sunrise = moment.unix(response.daily.data[0].sunriseTime);
        var sunriseLocal = moment.tz(sunrise, timezone).format("hh:mm a");

        var sunset = moment.unix(response.daily.data[0].sunsetTime);
        var sunsetLocal = moment.tz(sunset, timezone).format("hh:mm a");

        var date = moment(response.currently).format( "MM-DD-YYYY");

        var tempdata = "High:  " + hightemp + "    Low:  " + lowtemp
        var sundata =  "    Sunrise:  " + sunriseLocal + "    Sunset:  " + sunsetLocal;

        var weatherdata = tempdata + " " + sundata

        res.render("notes/notesweather", {projectid: proj, studentid: stud, date: date, weather:  weatherdata })

        }).catch(function (err) {
          res.json(err)
          console.log("error")
      });
    });
  });


router.post("/create/:projectid/:studentid", function(req, res) {
    
    var myRoute = "/notes/view/" + req.params.projectid;
    
    db.Fieldnote.create(req.body).then(function() {
        res.redirect( myRoute);
    }).catch(function(err) {
        console.log(err);
        res.json(err);
    }); 
});


router.get('/fileupload/:projectid/:studentid', isAuthenticated, (req, res) =>
       res.render("notes/file_upload_form", {projectid: req.params.projectid, studentid:  req.user.id }));


/*
 * Respond to GET requests to /sign-s3.
 */
router.get("/sign-s3", (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  console.log("fileName - "+ fileName)
  const fileType = req.query["file-type"];
  console.log("filetype - "+ fileType)
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };


  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    console.log(returnData);
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


module.exports = router;