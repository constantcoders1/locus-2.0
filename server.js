// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passportTeacher = require("./config/passportTeacher");
var passportStudent = require("./config/passportStudent");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3600;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passportStudent.initialize());
app.use(passportStudent.session());
app.use(passportTeacher.initialize());
app.use(passportTeacher.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var studentRoutes = require("./controllers/studentsController.js");
var notesRoutes = require("./controllers/notesController.js");

app.use("/student", studentRoutes);
app.use("/notes", notesRoutes);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==>  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
