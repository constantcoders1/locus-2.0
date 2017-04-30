// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {



  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });

   
 app.get("/student/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/students");
    }
    res.sendFile(path.join(__dirname + "/../public/student/signup.html"));
  });

  app.get("/teacher/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/teachers");
    }
    res.sendFile(path.join(__dirname + "/../public/teacher/signup.html"));
  });

  app.get("student/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/students");
    }
    res.sendFile(path.join(__dirname + "/../public/student/login.html"));
  });

  app.get("teacher/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/teachers");
    }
    res.sendFile(path.join(__dirname + "/../public/teacher/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/students", isAuthenticated, function(req, res) {
  
    res.sendFile(path.join(__dirname + "/../public/students.html"));
  });

  app.get("/teachers", isAuthenticated, function(req, res) {
   
    res.sendFile(path.join(__dirname + "/../public/teachers.html"));
  });

  app.get("/educators", isAuthenticated, function(req, res) {
   
    
  // res.sendFile(path.join(__dirname + "/../educatorview.html"));
  res.sendFile(path.join(__dirname + "/../educatorview.html"));
  });

  app.get("/students/view-field-notes", isAuthenticated, function(req, res) {
  
    res.sendFile(path.join(__dirname + "/../public/student/fieldNotes.html"));
  });

  app.get("/teachers/view-field-notes", isAuthenticated, function(req, res) {
    

    res.sendFile(path.join(__dirname + "/../public/student/fieldNotes.html"));
  });


  // /people/anna

  // // This is middleware for restrictng routes a user is not allowed to visit if not logged in
  // app.get('/people/:stuff', function(req, res, next) {

  //   // If the user is logged in, continue with the request to the restricted route
  //   if (req.user) {
  //     return next();
  //   }

  //   res.sendFile(path.join(__dirname + "/../public/people/people.html"));

  // };


  // app.get('/people/:id', function(req, res, next) {

  //   res.sendFile(path.join(__dirname + "/../public/people/signedinpeople.html"));

  // };

};
