// Requiring our models and passport as we've configured it
var db = require("../models");
var path = require("path")

var passport = require("../config/passport");

module.exports = function(app) {
  console.log("apiroutes.js function")
  // know that api routes is loaded & working



  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
   app.post("/api/login/teacher", passport.authenticate("local"), function(req, res) {
      // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
      // So we're sending the user back the route to the members page because the redirect will happen on the front end
      // They won't get this or even be able to access this page if they aren't authed
      res.json(req.user);
        // req.user let's us know that the usesr is logged.
    });


   app.post("/api/login/student", passport.authenticate("local"), function(req, res) {
    // just like teacher/educator - except for student
      res.json(req.user);
      
    });


app.get('/view/studentid', function(req,res){

  console.log("app get req.body = " + JSON.stringify(req.body))

  db.Student.findAll({ 
    where: {
      // id: req.params.studentid,
         id: req.body.id,
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
      db.Project.findAll({ 
        where: {
          id: projIds,
        },
        include: [db.Educator]

      }).then(function(result) {

        var obj_for_handlebars = []
        for (i in result){
          obj_for_handlebars.push(result[i].dataValues)
        }

        console.log(obj_for_handlebars)

         res.sendFile(path.join(__dirname + "/../public/students/student-view" ))
      

      });

    });
});



  app.get("/studentlocations", function(req, res) {
    console.log("api-routes/studentlocations")
    db.Student.findAll({
      attributes: ['latitude', 'longitude']
    }).then(function(genMapData) {
       var mapPoints = []
      for(i in genMapData){
        var pushPoint = genMapData[i].dataValues
        mapPoints.push(pushPoint);
      }
      res.json(mapPoints);
    })
  })


    app.get("/classlocations/:projid", function(req, res) {
    console.log("api-routes/classlocations")
    
    console.log("proj = " + req.params.projid)

      db.StudentToProject.findAll({
      where: {ProjectId: req.params.projid,
      },
      include: [db.Student]
    }).then(function(genMapData) {
        console.log(genMapData)
       var mapPoints = []
      for(i in genMapData){
        var pushPoint = {
          "latitude": genMapData[i].Student.latitude,
          "longitude": genMapData[i].Student.longitude,
          "username": genMapData[i].Student.username,
        }
         
        mapPoints.push(pushPoint);
      }
      console.log("map points ************************************")
      console.log(mapPoints);
      res.json(mapPoints);
     
    })

  })




  app.get("/api/projects", function(req, res) {

      console.log("getting projects");
      db.Project.findAll({
       
    }).then(function(dbProject) {
      res.json(dbProject);
    });
  });


    app.post("/api/studentAndProject", function(req, res) {
      console.log(req.body);
      db.StudentToProject.create({
          ProjectId: req.body.ProjId,
          StudentId: req.body.StuId,
      }).then(function(){
        console.log("added to StudentToProject")
      }).catch(function(err){
        console.log("error adding to StudentToProject  " + err)
      });
    });


    app.post("/api/signup/teacher", function(req, res) {
    console.log("teacher sign up" );
    console.log(req.body)
    db.Educator.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    }).then(function(dbEducator) {
      console.log("post educator sign up then clause")
       res.json(dbEducator);
    }).catch(function(err) {
      console.log("post ed add: "+ err)
      if (err != undefined) {
           res.status(500).json(err)
    }
    });
  });


  // this posts the student information to the student table
 app.post("/api/signup/student", function(req, res) {
    db.Student.create(
     {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
    }
    ).then(function(dbStudent) {
      // return the student information
       res.json(dbStudent);
            
    }).catch(function(err) {
      // catch errors and send them back to the calling function
      // emails must be unique
      // some fields are also required
      // these are the most common errors
      console.log("app post - " + err);
     if (err != undefined) {
           res.status(500).json(err)
    }
    });
  });

app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
      });
    }
  });




  app.get('/logout', function(req,res){
    console.log("logging out")
   req.logOut();
   req.session.destroy(function (err) {
          res.redirect('/'); 
      });
  });

};
