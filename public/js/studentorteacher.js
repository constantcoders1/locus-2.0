$(document).ready(function() {
  var path = require("path");
  // Getting references to our form and input
  var studentorteacher = $("form.studentorteacher");
  // var emailInput = $("input#email-input");
  // var passwordInput = $("input#password-input");
  var  userTypeInput = $("input#usertype")

 
  studentorteacher.on("submit", function(event) {
    event.preventDefault();


    var userData = {
      user: userTypeInput.val().trim(),
    };

    usertype = userData.user;
    console.log(usertype)

   	if (usertype.toLowerCase() == "teacher"){
   		res.sendFile(path.join(__dirname + "/../public/teacher/signup.html"));
   	} else {
   		res.sendFile(path.join(__dirname + "/../public/student/signup.html"));
   	}
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  // function signUpUser(email, password) {
  //   $.post("/api/signup", {
  //     email: email,
  //     password: password
  //   }).then(function(data) {
  //     window.location.replace(data);
  //   }).catch(function(err) {
  //     console.log(err);
  //   });
  // }

});
