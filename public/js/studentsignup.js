$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  // var usernameInput = $("input#username-input");
  // var keywordInput = $("input#keyword-input")
  // var countryInput = $("input#country-input");
  // var stateInput = $("input#state-input");
  // var cityInput = $("input#city-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("signup form student")
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      // username: usernameInput.val().trim(),
      // keyword: keywordInput.val().trim(),
      // country: countryInput.val().trim(),
      // state:  stateInput.val().trim(),
      // city: cityInput.val().trim()

    };



    if (!userData.email || !userData.password) {
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
    $.post("/api/signup/student", userData).then(function(data) {
      // window.location.replace(data);
    }).catch(function(err) {
      console.log(err);
    });
  }

});
