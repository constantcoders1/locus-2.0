var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// var LocalStrategy = require("teacher-local").Strategy;

var userData = {}
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {

  var role = email.substr(0,2)
  email = email.substr(2)


    // console.log("source - " + source);
    console.log("email - " + email);
    console.log("password - " + password);
    // console.log("role = " + role)

    // When a user tries to sign in this code runs
    
    if (role == "E*" || role == "T*") {

    db.Educator.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      // console.log("then function:  " + JSON.stringify(dbUser));
      if (!dbUser) {
        console.log("incorrect email")
        return done(null, false, {
          message: "Incorrect email."
          // console.log("Incorrect email")
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log("incorrect password");
        return done(null, false, {
          message: "Incorrect password."
         
        });
      }
      // If none of the above, return the user
      userData = {
        role: "Educator",
        id: dbUser.id,
        user: dbUser.username,
        email: dbUser.email,
      }
      
       console.log("logged in as:  " + JSON.stringify(userData)); 
      return done(null, userData);
    
    });

} else {

    db.Student.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        console.log("incorrect email")
        return done(null, false, {
          message: "Incorrect email."
          // console.log("Incorrect email")
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log("incorrect password");
        return done(null, false, {
          message: "Incorrect password."
        });
      }

      userData = {
        role: "Student",
        id: dbUser.id,
        user: dbUser.username,
        email: dbUser.email,
      }
      // If none of the above, return the user
      console.log("logged in as:  " + JSON.stringify(dbUser));
      return done(null, userData);
    
    });

  }


  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {

  cb(null, user);
  console.log("serializeUser:  " + JSON.stringify(user))
  console.log("serializeUser unstringified:  "+ user)
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
