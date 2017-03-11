// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  console.log("apiroutes.js function")
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
 app.post("/api/login/teacher", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });



 app.post("/api/login/student", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });


//     // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
//     // So we're sending the user back the route to the members page because the redirect will happen on the front end
//     // They won't get this or even be able to access this page if they aren't authed
//     res.json("/members");
//   });


  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  

    app.post("/api/signup/teacher", function(req, res) {
    console.log("teacher sign up" );
    db.Teacher.create({
      email: req.body.email,
      password: req.body.password,

      // restore when html with the below fields are available
      // username: req.body.username,
      // keyword: req.body.keyword,
    }).then(function() {
      console.log("post teacher sign up then clause")
      // res.redirect(307, "/api/login/teacher");
    }).catch(function(err) {
      console.log(err)
      res.json(err);
    });
  });

 app.post("/api/signup/student", function(req, res) {
    console.log("student sign up");
     db.Student.create({
      email: req.body.email,
      password: req.body.password,
      // username: req.body.username,
      // keyword: req.body.keyword,
      // country: req.body.country,
      // state: req.body.state,
      // city: req.body.city,
    }).then(function() {
      console.log("post student sign up then clause")
      // res.redirect(307, "/api/login/student");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });

    // need to get keyword & look up teacher id
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

   ////GET Route for entering observations
app.get("/api/fieldnotes", function(req, res) {
    console.log(req.body);
    res.render('notes');
  });

  //POST Route for entering observations
  app.post("/api/fieldnotes", function(req, res) {
    console.log(req.body);
    /*db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      res.json(err);
    });*/
  });

  // Route for getting some data about our user to be used client side

  // this needs to be updated since we are pulling user info from
  // different tables if it is a student or teacher


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
        id: req.user.id
      });
    }
  });

};
