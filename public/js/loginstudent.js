$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  console.log("student login")

  // When the form is submitted, we validate there's an email and password entered


 
  loginForm.on("submit", function(event) {
    console.log("student login submit")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form

    // prepend email with S* so we know it is a student
    
    loginStudent("S*"+userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
 
 function loginStudent(email, password) {
    console.log("email = "+ email)
    $.post("/api/login/student", {
      email: email,
      password: password,
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }


});
