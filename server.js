// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it

var passport = require("./config/passport");
var rp = require('request-promise');


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

app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.

// var applicationRoutes = require("./controllers/applicationController.js")
var studentRoutes = require("./controllers/studentsController.js");
var notesRoutes = require("./controllers/notesController.js");
var projectRoutes = require("./controllers/projectController.js");
var educatorRoutes = require("./controllers/educatorsController.js")

// app.use("/", applicationRoutes)

app.use("/student", studentRoutes);
app.use("/notes", notesRoutes);
app.use("/project", projectRoutes);
app.use("/educator", educatorRoutes);


// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==>  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
