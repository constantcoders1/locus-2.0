$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var usernameInput = $("input#username-input");
  var keywordInput = $("input#keyword-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("signupform teacher")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),

      // fields aren't available yet so ignored for now
      // *****************************
      // username: usernameInput.val().trim(),
      // keyword: keywordInput.val().trim(),
      // ********************************
      // restore the above fields when new html is available
    };

    if (!userData.email || !userData.password) {
      console.log("no email or password")
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    console.log("signed up?")
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup/teacher", userData).then(function(data) {
      console.log("post then.....");
      console.log(data);
      // window.location.replace(data);
    }).catch(function(err) {
      console.log(err);
    });
    console.log("end of signUpUser")
  }

});
